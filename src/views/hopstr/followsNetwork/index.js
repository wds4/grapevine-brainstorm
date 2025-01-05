import { CButton, CCard, CCardBody, CContainer, CRow, CCol, CTable } from '@coreui/react'
import { useActiveUser } from 'nostr-hooks'
import React, { useEffect, useState } from 'react'
import PulseLoader from 'react-spinners/PulseLoader'
import MiniProfile from 'src/views/components/miniProfile'
import { secsToTimeAgo } from '../../../helpers'

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const SelectRandomNpub = ({ followsNetwork, hops, setRandomPubkey }) => {
  const [randomPubkeyThisDos, setRandomPubkeyThisDos] = useState('')
  const aPubkeys = followsNetwork.data.pubkeysByDoS[Number(hops)]
  const selectRandomNpub = () => {
    const randomInt = getRandomInt(0, aPubkeys.length - 1)
    const randPubkey = aPubkeys[randomInt]
    console.log(
      `selectRandomNpub ${hops} hops away. ${aPubkeys.length} from which to choose. result: ${randomInt}; ${randPubkey}`,
    )
    setRandomPubkey(randPubkey)
    setRandomPubkeyThisDos(randPubkey)
  }
  return (
    <CRow>
      <CCol style={{ display: 'inline-block', height: '50px' }}>
        <CButton color="primary" onClick={() => selectRandomNpub()}>
          ... {hops} hops away from you
        </CButton>
      </CCol>
      <CCol style={{ display: 'inline-block' }}>
        <MiniProfile pubkey={randomPubkeyThisDos} />
      </CCol>
    </CRow>
  )
}

const DisplayDosSummary = ({ followsNetwork, setRandomPubkey }) => {
  const dosDataToShow = followsNetwork.data.numPubkeysByDoS
  const columns = [
    {
      key: 'hops',
      _props: { scope: 'col' },
    },
    {
      key: 'num_users',
      label: '# of users',
      _props: { scope: 'col' },
    },
    {
      key: 'button',
      label: 'select a profile at random ...',
      _props: { scope: 'col' },
    },
  ]
  const aDataItemKeys = Object.keys(dosDataToShow)
  const aItems = []
  for (let x = 0; x < aDataItemKeys.length; x++) {
    const nextKey = aDataItemKeys[x]
    const nextVal = dosDataToShow[nextKey]
    const hops = nextKey.substr(8)
    // console.log(`nextKey: ${nextKey}`)
    // console.log(`nextVal: ${nextVal}`)
    const oNextRow = {
      hops: hops,
      num_users: nextVal,
      button: (
        <SelectRandomNpub
          followsNetwork={followsNetwork}
          hops={hops}
          setRandomPubkey={setRandomPubkey}
        />
      ),
    }
    aItems.push(oNextRow)
  }
  console.log(`rerender DisplayDosSummary`)
  return (
    <>
      <div>last updated: {secsToTimeAgo(followsNetwork.metaData.whenLastUpdated)} </div>
      <div style={{ marginTop: '50px' }}>
        <CTable columns={columns} items={aItems} />
      </div>
    </>
  )
}

const FollowsNetworkExists = ({ pubkey, followsNetwork, setRandomPubkey }) => {
  return (
    <>
      <CContainer md>
        <CRow className="justify-content-center">
          <CCard className="w-100" style={{ marginTop: '20px' }}>
            <CCardBody>
              <center>
                <h4>Your Follows Network</h4>
                <DisplayDosSummary
                  followsNetwork={followsNetwork}
                  setRandomPubkey={setRandomPubkey}
                />
              </center>
            </CCardBody>
          </CCard>
        </CRow>
      </CContainer>
    </>
  )
}

const ObtainFollowsNetworkIfExists = ({ pubkey, setRandomPubkey }) => {
  const [exists, setExists] = useState('pending')
  const [followsNetwork, setFollowsNetwork] = useState({})

  const url = `https://www.graperank.tech/api/outwardFacing/getFollowsNetwork?observer=${pubkey}`
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          setExists('query failed')
        }
        if (data.success) {
          if (data.exists) {
            setExists('YES')
            const oFollowsNetwork = data.data.oFollowsNetwork
            setFollowsNetwork(oFollowsNetwork)
          }
          if (!data.exists) {
            setExists('NO')
          }
        }
      })
  }, [])

  if (exists == 'YES')
    return (
      <FollowsNetworkExists
        pubkey={pubkey}
        followsNetwork={followsNetwork}
        setRandomPubkey={setRandomPubkey}
      />
    )
  if (exists == 'NO')
    return (
      <p>
        Follows Network for Pubkey {pubkey} has not been calculated. Insert calculate it button!
      </p>
    )

  return (
    <div>
      <div style={{ display: 'inline-block' }}>
        <PulseLoader />
      </div>
      Checking the Brainstorm / GrapeRank.tech API for the follows network of the user profile with
      pubkey: {pubkey}.
      <div style={{ display: 'inline-block' }}>
        <PulseLoader />
      </div>
    </div>
  )
}

const CheckingActiveUser = ({ setRandomPubkey }) => {
  console.log(`rerender IsMyFollowsNetworkCalculated`)
  const { activeUser } = useActiveUser()
  if (!activeUser) return <div>retrieving the active user pubkey ...</div>
  return (
    <ObtainFollowsNetworkIfExists pubkey={activeUser.pubkey} setRandomPubkey={setRandomPubkey} />
  )
}

const FollowsNetwork = () => {
  const [randomPubkey, setRandomPubkey] = useState('')
  return (
    <div style={ {marginBottom: '100px' }}>
      <CheckingActiveUser setRandomPubkey={setRandomPubkey} />
    </div>
  )
}

export default FollowsNetwork
