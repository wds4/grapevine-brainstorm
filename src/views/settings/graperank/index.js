import { useActiveUser } from 'nostr-hooks'
import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CContainer, CRow, CButton } from '@coreui/react'

const SorryToSeeYouGo = ({ data }) => {
  if (data.success) {
    return <div>We're sorry to see you go! Sign up again if you want! (Refresh the page)</div>
  }
  return (
    <>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </>
  )
}

const UnsubscribeButton = ({ pubkey, setData }) => {
  const unsubscribeFromBrainstorm = () => {
    console.log('unsubscribeFromBrainstorm ' + pubkey)
    const url = 'https://www.graperank.tech/api/customers/unsubscribe?pubkey=' + pubkey
    fetch(url)
      .then((response) => response.json())
      // .then(data => setResp(response))
      .then((data) => setData(data))
  }
  return (
    <>
      <CCardBody>
        <div className="d-grid gap-2">
          <div>You are subscribed to the Grapevine (GrapeRank) as a customer.</div>
        </div>
      </CCardBody>
      <CCardBody>
        <CButton color="primary" onClick={() => unsubscribeFromBrainstorm()}>
          Unsubscribe
        </CButton>
      </CCardBody>
    </>
  )
}

const CustomerStatusExists = ({ pubkey }) => {
  const [data, setData] = useState({})

  if (data.success) {
    return <SorryToSeeYouGo data={data} />
  }
  return (
    <>
      <CContainer md style={{ marginTop: '50px' }}>
        <CRow className="justify-content-center">
          <div className="col-auto">
            <CCard className="w-80">
              <UnsubscribeButton pubkey={pubkey} setData={setData} />
            </CCard>
          </div>
        </CRow>
      </CContainer>
    </>
  )
}

const QueryCustomerStatus = ({ pubkey }) => {
  const [exists, setExists] = useState('pending')
  const [data, setData] = useState({})

  const url = 'https://www.graperank.tech/api/customers/queryCustomerStatus?pubkey=' + pubkey
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data)
        if (!data.success) {
          setExists('query failed')
        }
        if (data.success) {
          if (data.exists) {
            setExists('YES')
          }
          if (!data.exists) {
            setExists('NO')
          }
        }
      })
  }, [])

  if (exists == 'YES') return <CustomerStatusExists pubkey={pubkey} />
  if (exists == 'NO') return <p>Pubkey {pubkey} is not a customer of the Grapevine (v2).</p>

  return (
    <div>
      <div>
        ... checking the Brainstorm Calculation Engine API for user profile with pubkey: {pubkey}{' '}
        ...
      </div>
    </div>
  )
}

const CheckingActiveUser = () => {
  const { activeUser } = useActiveUser()
  if (!activeUser) return <div>retrieving the active user pubkey ...</div>
  return <QueryCustomerStatus pubkey={activeUser.pubkey} />
}

const GrapeRankSettings = () => {
  return (
    <>
      <center>
        <h3>GrapeRank Settings</h3>
      </center>
      <CheckingActiveUser />
    </>
  )
}

export default GrapeRankSettings
