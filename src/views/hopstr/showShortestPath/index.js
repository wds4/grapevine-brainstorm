import {
  CButton,
  CCard,
  CCardBody,
  CCardTitle,
  CContainer,
  CForm,
  CFormInput,
  CRow,
} from '@coreui/react'
import React, { useCallback, useState, useEffect } from 'react'
import { getPubkeyFromNpub, safeNpubEncode, verifyPubkeyValidity } from 'src/helpers/nip19'
import MiniProfile from 'src/views/components/miniProfile'

const InputFieldStatus = ({ pubkey }) => {
  if (!pubkey) {
    // return <span style={{ color: 'grey' }}>invalid</span>
    return <></>
  }
  return (
    <div style={{ display: 'inline-block', fontSize: '24px' }}>
      <center>✅</center>
    </div>
  )
}

const ShowShortestPath = ({ from_pubkey, to_pubkey }) => {
  console.log(`rerender ShowShortestPath`)

  const [aPubkeys, setAPubkeys] = useState([])
  async function fetchArrayOfPubkeys({ url }) {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      if (data.success) {
        const aPubs = data.data.aPubkeys
        setAPubkeys(aPubs)
        console.log(`fetchArrayOfPubkeys success! aPubs: ${JSON.stringify(aPubs)}`)
      }
    } catch (error) {
      console.error('getFollows endpoint error:', error)
    }
  }
  const findShortestPath = () => {
    const url = `https://www.graperank.tech/api/neo4j/getShortestPath?pubkey1=${from_pubkey}&pubkey2=${to_pubkey}`
    console.log(`findShortestPath; url: ${url}`)
    fetchArrayOfPubkeys({ url })
  }

  if (!from_pubkey || !to_pubkey) {
    return <></>
  }

  return (
    <>
      <center>
        <div style={{ display: 'inline-block' }}>
          <CButton color="primary" onClick={() => findShortestPath()}>
            Find Shortest Path
          </CButton>
        </div>
      </center>

      <CContainer md style={{ marginTop: '20px' }}>
        <CRow className="justify-content-center">
          <div className="col-auto">
            <CCard className="w-80">
              <CCardBody>
                <center>
                  <CCardTitle>
                    Shortest Path by Follows
                    <NumHops aPubkeys={aPubkeys} />
                  </CCardTitle>
                </center>
              </CCardBody>
              <CCardBody>
                {aPubkeys.map((pk, item) => {
                  return (
                    <div key={item}>
                      <FollowsDownArrow item={item} />
                      <div>
                        <div
                          style={{
                            display: 'inline-block',
                            verticalAlign: 'top',
                            color: 'grey',
                          }}
                        >
                          ({item})
                        </div>
                        <div style={{ display: 'inline-block' }}>
                          <MiniProfile pubkey={pk} />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </CCardBody>
            </CCard>
          </div>
        </CRow>
      </CContainer>
    </>
  )
}

const NumHops = ({ aPubkeys }) => {
  if (aPubkeys.length == 0) {
    return <></>
  }
  return <>: {aPubkeys.length - 1} hops</>
}

const FollowsDownArrow = ({ item }) => {
  if (item > 0) {
    return (
      <div style={{ fontSize: '36px' }}>
        <center>⬇️</center>
      </div>
    )
  }
  return <></>
}

const FeatureA = () => {
  const [error, setError] = useState(false)
  const [from, setFrom] = useState('')
  const [from_npub, setFrom_npub] = useState('')
  const [from_pubkey, setFrom_pubkey] = useState('')

  const [to, setTo] = useState('')
  const [to_npub, setTo_npub] = useState('')
  const [to_pubkey, setTo_pubkey] = useState('')

  const handleFromChange = useCallback(
    (e) => {
      setFrom(e.target.value)
      setFrom_npub('')
      setFrom_pubkey('')
      if (getPubkeyFromNpub(e.target.value)) {
        console.log(`valid npub!`)
        const pk = getPubkeyFromNpub(e.target.value)
        setFrom_pubkey(pk)
        setFrom_npub(e.target.value)
      }
      if (verifyPubkeyValidity(e.target.value) == 'valid') {
        console.log(`valid pubkey!`)
        const npub = safeNpubEncode(e.target.value)
        setFrom_npub(npub)
        setFrom_pubkey(e.target.value)
      }
    },
    [setFrom, setError],
  )

  const handleToChange = useCallback(
    (e) => {
      setTo(e.target.value)
      setTo_npub('')
      setTo_pubkey('')
      if (getPubkeyFromNpub(e.target.value)) {
        console.log(`valid npub!`)
        const pk = getPubkeyFromNpub(e.target.value)
        setTo_pubkey(pk)
        setTo_npub(e.target.value)
      }
      if (verifyPubkeyValidity(e.target.value) == 'valid') {
        console.log(`valid pubkey!`)
        const npub = safeNpubEncode(e.target.value)
        setTo_npub(npub)
        setTo_pubkey(e.target.value)
      }
    },
    [setTo, setError],
  )
  console.log(`rerender FeatureA`)
  return (
    <>
      <center>
        <h3>Find the Shortest Path by follows</h3>
      </center>
      <div className="d-flex docs-highlight">
        <div
          className="p-2 docs-highlight"
          style={{ fontSize: '24px', width: '100px', textAlign: 'right' }}
        >
          FROM:{' '}
        </div>
        <div className="p-2 flex-grow-1 docs-highlight">
          <CForm>
            <CFormInput
              type="text"
              placeholder="npub or pubkey"
              required
              value={from}
              onChange={handleFromChange}
              invalid={error}
            />
          </CForm>
        </div>
        <div className="p-2 docs-highlight">
          <InputFieldStatus pubkey={from_pubkey} />
        </div>
      </div>
      <div style={{ marginLeft: '100px' }}>
        <MiniProfile pubkey={from_pubkey} />
      </div>

      <div className="d-flex docs-highlight" style={{ marginTop: '20px' }}>
        <div
          className="p-2 docs-highlight"
          style={{ fontSize: '24px', width: '100px', textAlign: 'right' }}
        >
          TO:{' '}
        </div>
        <div className="p-2 flex-grow-1 docs-highlight">
          <CForm>
            <CFormInput
              type="text"
              placeholder="npub or pubkey"
              required
              value={to}
              onChange={handleToChange}
              invalid={error}
            />
          </CForm>
        </div>
        <div className="p-2 docs-highlight">
          <InputFieldStatus pubkey={to_pubkey} />
        </div>
      </div>

      <div style={{ marginLeft: '100px' }}>
        <MiniProfile pubkey={to_pubkey} />
      </div>

      <div style={{ marginTop: '20px' }}>
        <ShowShortestPath from_pubkey={from_pubkey} to_pubkey={to_pubkey} />
      </div>
    </>
  )
}

export default FeatureA
