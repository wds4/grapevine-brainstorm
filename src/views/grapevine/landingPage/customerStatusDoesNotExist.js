import React, { useState } from 'react'
import { CButton, CCard, CCardBody, CContainer, CCardTitle, CRow } from '@coreui/react'
import CelebrateSuccessfulSignUp from './celebrateSuccessfulSignup'

const SubscribeButton = ({ pubkey, setData }) => {
  const signUpToBrainstorm = () => {
    console.log('signUpToBrainstorm ' + pubkey)
    const url =
      'https://calculation-brainstorm.vercel.app/api/grapevine/addNewCustomer?pubkey=' + pubkey
    fetch(url)
      .then((response) => response.json())
      // .then(data => setResp(response))
      .then((data) => setData(data))
  }
  return (
    <>
      <CCardBody>
        <div className="d-grid gap-2">
          <div>
            Would you like to subscribe? If so, submit your pubkey by clicking the button below:
          </div>
        </div>
      </CCardBody>
      <CCardBody>
        <div className="d-grid gap-2">
          <CButton color="primary" onClick={() => signUpToBrainstorm()}>
            Subscribe
          </CButton>
        </div>
      </CCardBody>
    </>
  )
}

const CustomerStatusDoesNotExist = ({ pubkey }) => {
  const [data, setData] = useState({})

  if (data.success) {
    return <CelebrateSuccessfulSignUp data={data} pubkey={pubkey} />
  }
  return (
    <>
      <CContainer md style={{ marginTop: '50px' }}>
        <CRow className="justify-content-center">
          <div className="col-auto">
            <CCard className="w-80">
              <CCardBody>
                <center>
                  <CCardTitle>
                    You are not subscribed to the Brainstorm Suite of Grapevine Services.
                  </CCardTitle>
                </center>
              </CCardBody>
              <CCardBody>
                <div className="d-grid gap-2">
                  <div>
                    These services include the Brainstorm Calculation and Interpretation engines.
                  </div>
                  <li>calculation, storage and export of your DoS WoT Network</li>
                  <li>calculation, storage and export of your Grapevine WoT Network</li>
                  <li>WoT network updates on demand, up to once per day</li>
                </div>
              </CCardBody>
              <SubscribeButton pubkey={pubkey} setData={setData} />
            </CCard>
          </div>
        </CRow>
      </CContainer>
    </>
  )
}

export default CustomerStatusDoesNotExist
