import { CButton, CCard, CCardBody, CContainer, CRow, CCol, CTable } from '@coreui/react'
import { useActiveUser } from 'nostr-hooks'
import React, { useEffect, useState } from 'react'
import PulseLoader from 'react-spinners/PulseLoader'
import MiniProfile from 'src/views/components/miniProfile'
import { secsToTimeAgo } from '../../../helpers'
import ShowShortestPath from 'src/views/graperank/components/showShortestPath'

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const RecalculateFollowsNetwork = ({pubkey}) => {
  const [dosSuccess, setDosSuccess] = useState(false)
  const [calculationsTriggered, setCalculationsTriggered] = useState(false)
  const recalculateFollowsNetwork = async () => {
    console.log(`recalculateFollowsNetwork`)
    setCalculationsTriggered(true)
    const url = `https://www.graperank.tech/api/algos/dos/fullWoT_updateS3?pubkey=${pubkey}`
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      if (!data.success) {
        setExists('DoS calculations failed')
      }
      if (data.success) {
        if (data.exists) {
          setDosSuccess(true)
        }
        if (!data.exists) {
          setDosSuccess(false)
        }
      }
    } catch (error) {
      console.error('api/algos/dos/fullWoT_updateS3 endpoint error:', error)
    }
  }

  if (dosSuccess) {
    return (
      <CContainer>
        <center>
          <h4>
            successfully recalculated your Follows Network Degrees of Separation (DoS) Web of Trust
          </h4>
        </center>
      </CContainer>
    )
  }

  if (calculationsTriggered) {
    return (
      <h4>
        <div style={{ display: 'inline-block' }}>
          <PulseLoader />
        </div>{' '}
        recalculating your Follows Network{' '}
        <div style={{ display: 'inline-block' }}>
          <PulseLoader />
        </div>
      </h4>
    )
  }
  return <CButton color="link" onClick={() => recalculateFollowsNetwork()}>recalculate follows network</CButton>
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
      <CCol sm="auto" style={{ display: 'inline-block', height: '50px' }}>
        <CButton color="primary" onClick={() => selectRandomNpub()}>
          {hops} hops
        </CButton>
      </CCol>
      <CCol style={{ display: 'inline-block' }}>
        <MiniProfile pubkey={randomPubkeyThisDos} />
      </CCol>
    </CRow>
  )
}

const DisplayDosSummary = ({ pubkey, followsNetwork, setRandomPubkey }) => {
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
      label: 'select a profile at random, separated from you by:',
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
      <RecalculateFollowsNetwork pubkey={pubkey} />
      <div style={{ marginTop: '50px' }}>
        <CTable columns={columns} items={aItems} />
      </div>
    </>
  )
}

const FollowsNetworkExists = ({ pubkey, followsNetwork, randomPubkey, setRandomPubkey }) => {
  return (
    <>
      <CContainer md>
        <CRow className="justify-content-center">
          <CCol>
            <CCard className="w-100">
              <CCardBody>
                <center>
                  <h4>My Follows Network</h4>
                  <DisplayDosSummary
                    pubkey={pubkey}
                    followsNetwork={followsNetwork}
                    setRandomPubkey={setRandomPubkey}
                  />
                </center>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol>
            <ShowShortestPath from_pubkey={pubkey} to_pubkey={randomPubkey} />
          </CCol>
        </CRow>
      </CContainer>
    </>
  )
}

const CalculateFollowsNetworkButton = ({ pubkey }) => {
  const [showButtonDisplay, setShowButtonDisplay] = useState('block')
  const [showRequestSentDisplay, setShowRequestSentDisplay] = useState('none')
  const [customerStatusConfirmed, setCustomerStatusConfirmed] = useState(0)
  const [dosSuccess, setDosSuccess] = useState(false)

  const calculateFollowsNetwork = async () => {
    const url = `https://www.graperank.tech/api/algos/dos/fullWoT_updateS3?pubkey=${pubkey}`
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      if (!data.success) {
        setExists('DoS calculations failed')
      }
      if (data.success) {
        if (data.exists) {
          setDosSuccess(true)
        }
        if (!data.exists) {
          setDosSuccess(false)
        }
      }
    } catch (error) {
      console.error('api/algos/dos/fullWoT_updateS3 endpoint error:', error)
    }
  }

  const signUpToBrainstorm = () => {
    console.log('signUpToBrainstorm ' + pubkey)
    setShowButtonDisplay('none')
    setShowRequestSentDisplay('block')
    const url = `https://www.graperank.tech/api/customers/addNewCustomer?pubkey=${pubkey}`
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const alreadyCustomer = data.data.alreadyCustomer
        console.log(`alreadyCustomer: ${alreadyCustomer}`)
        if (data.success) {
          setCustomerStatusConfirmed(1)
          calculateFollowsNetwork()
        }
        if (!data.success) {
          setCustomerStatusConfirmed(2)
        }
      })
  }
  if (dosSuccess) {
    return (
      <>
        <CContainer>
          <center>
            <h3>
              successfully calculated your Follows Network Degrees of Separation (DoS) Web of Trust
            </h3>
          </center>
        </CContainer>
      </>
    )
  }
  if (customerStatusConfirmed == 2) {
    return <div>error with request</div>
  }
  if (customerStatusConfirmed == 1) {
    return (
      <CContainer>
        <center>
          <h3>
            {' '}
            <div style={{ display: 'inline-block' }}>
              <PulseLoader />
            </div>{' '}
            calculating Degrees of Separation{' '}
            <div style={{ display: 'inline-block' }}>
              <PulseLoader />
            </div>
          </h3>
          <h4>(This should take 25-30 secs; maybe up to a minute or two)</h4>
        </center>
      </CContainer>
    )
  }
  return (
    <>
      <CCardBody
        style={{
          display: showButtonDisplay,
        }}
      >
        <div className="d-grid gap-2 col-6 mx-auto">
          <CButton color="primary" size="lg" onClick={() => signUpToBrainstorm()}>
            Calculate your Follows Network
          </CButton>
        </div>
      </CCardBody>
      <CCardBody
        style={{
          display: showRequestSentDisplay,
        }}
      >
        <div>Subscription request sent.</div>
        <div>Awaiting response.</div>
      </CCardBody>
    </>
  )
}

const ObtainFollowsNetworkIfExists = ({ pubkey, randomPubkey, setRandomPubkey }) => {
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
        randomPubkey={randomPubkey}
      />
    )
  if (exists == 'NO')
    return (
      <CContainer md style={{ marginTop: '50px' }}>
        <CRow className="justify-content-center">
          <div className="col-auto">
            <center>
              <div className="d-flex justify-content-between flex-column">
                <div style={{ fontSize: '48px', marginBottom: '60px' }}>
                  your ➡️ Follows ➡️ Network ➡️
                </div>
                <center>
                  <div style={{ marginBottom: '70px', width: '500px', textAlign: 'left' }}>
                    <p>The Follows Network is one type of Web of Trust.</p>
                    <p>
                      It is composed of the nostr profiles you follow, the ones they follow, and so
                      on. The maximum number of allowed "hops" can be restricted or unrestricted.
                    </p>
                    <p>
                      As of Jan 2025, the unrestricted Follows Network for most users extends as far
                      away as 7-8 hops and is composed of over 175,000 npubs.
                    </p>
                    <p>
                      Our service keeps track of kind 3 notes (follows) and maintains a graph
                      database of nostr profiles and their follow relationships. This toold allows
                      for efficient determination of any user's Follows Network. It can also be used
                      for efficient calculation of the shortest follows path between any two npubs.
                    </p>
                  </div>
                </center>
                <div style={{ marginBottom: '40px' }}>
                  My Follows Network has not yet been calculated.
                </div>
                <CalculateFollowsNetworkButton pubkey={pubkey} />
              </div>
            </center>
          </div>
        </CRow>
      </CContainer>
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

const CheckingActiveUser = ({ randomPubkey, setRandomPubkey }) => {
  console.log(`rerender IsMyFollowsNetworkCalculated`)
  const { activeUser } = useActiveUser()
  if (!activeUser) return <div>retrieving the active user pubkey ...</div>
  return (
    <ObtainFollowsNetworkIfExists
      pubkey={activeUser.pubkey}
      randomPubkey={randomPubkey}
      setRandomPubkey={setRandomPubkey}
    />
  )
}

const FollowsNetwork = () => {
  const [randomPubkey, setRandomPubkey] = useState('')
  return (
    <div style={{ marginBottom: '100px' }}>
      <CheckingActiveUser randomPubkey={randomPubkey} setRandomPubkey={setRandomPubkey} />
    </div>
  )
}

export default FollowsNetwork
