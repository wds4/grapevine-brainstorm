import { useActiveUser } from 'nostr-hooks'
import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CContainer, CRow, CButton, CCol, CCardHeader } from '@coreui/react'
import RecalculateGrapeRank from './recalculate'

const SorryToSeeYouGo = ({ data }) => {
  if (data.success) {
    return <div>We're sorry to see you go! Please come back soon!</div>
  }
  return (
    <>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </>
  )
}

const Unsubscribe = ({ pubkey, setData }) => {
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
      <CContainer md style={{ marginTop: '20px' }}>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Subscription Status</strong>
              </CCardHeader>
              <CCardBody>
                <div className="d-grid gap-2">
                  <div>
                    You are subscribed to the Grapevine (GrapeRank) as a customer.
                    <CButton color="primary" style={{float: 'right'}} onClick={() => unsubscribeFromBrainstorm()}>
                      Unsubscribe
                    </CButton>
                  </div>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </>
  )
}

const CustomerStatusExists = ({ pubkey, grapeRankParams }) => {
  const [data, setData] = useState({})

  if (data.success) {
    return <SorryToSeeYouGo data={data} />
  }
  return (
    <>
      <RecalculateGrapeRank pubkey={pubkey} grapeRankParams={grapeRankParams} />
      <Unsubscribe pubkey={pubkey} setData={setData} />
    </>
  )
}

const QueryCustomerStatus = ({ pubkey }) => {
  const [exists, setExists] = useState('pending')
  const [data, setData] = useState({})
  const [grapeRankParams, setGrapeRankParams] = useState({})

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
            const oCustomerData = data.data.oCustomerData
            const oGrapeRankParams = oCustomerData.grapeRankParams
            setGrapeRankParams(oGrapeRankParams)
          }
          if (!data.exists) {
            setExists('NO')
          }
        }
      })
  }, [])

  if (exists == 'YES') return <CustomerStatusExists pubkey={pubkey} grapeRankParams={grapeRankParams} />
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
        <h3>Settings</h3>
      </center>
      <CheckingActiveUser />
    </>
  )
}

export default GrapeRankSettings
