import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CContainer, CCardTitle, CRow } from '@coreui/react'
import { useActiveUser } from 'nostr-hooks'
import CustomerStatusDoesNotExist from './customerStatusDoesNotExist'

// const pubkey1 = 'e5272de914bd301755c439b88e6959a43c9d2664831f093c51e9c799a16a102f'

const CustomerStatusExists = ({ pubkey }) => {
  return (
    <>
      <CContainer md style={{ marginTop: '50px' }}>
        <CRow className="justify-content-center">
          <div className="col-auto">
            <CCard className="w-80">
              <CCardBody>
                <center>
                  <CCardTitle>
                    You are subscribed to the Brainstorm Suite of Grapevine Services!
                  </CCardTitle>
                </center>
              </CCardBody>
              <CCardBody>
                <div className="d-grid gap-2">
                  <div>
                    These services include the Brainstorm Calculation and Interpretation engines:
                  </div>
                  <li>calculation, storage and export of your DoS WoT Network</li>
                  <li>calculation, storage and export of your Grapevine WoT Network</li>
                  <li>WoT network updates on demand, up to once per day</li>
                </div>
              </CCardBody>
              <CCardBody>
                <div className="d-grid gap-2">
                  <div>Check the menu on the left to review your WoT Networks.</div>
                </div>
              </CCardBody>
            </CCard>
          </div>
        </CRow>
      </CContainer>
    </>
  )
}

const QueryCalculationApi = ({ pubkey }) => {
  const [exists, setExists] = useState('pending')
  const [data, setData] = useState({})

  const url =
    'https://calculation-brainstorm.vercel.app/api/grapevine/checkCustomerStatus?pubkey=' + pubkey
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      // .then(data => setResp(response))
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
  if (exists == 'NO') return <CustomerStatusDoesNotExist pubkey={pubkey} />

  return (
    <div>
      <div>... checking the Brainstorm Calculation Engine API for user profile with pubkey: {pubkey} ...</div>
      <div>You can try it yourself! Just go to:</div>
      <div>{url}</div>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </div>
  )
}
const AppDashboard = () => {
  const { activeUser } = useActiveUser()
  if (!activeUser) return <div>retrieving the active user pubkey ...</div>
  return <QueryCalculationApi pubkey={activeUser.pubkey} />
}

export default AppDashboard
