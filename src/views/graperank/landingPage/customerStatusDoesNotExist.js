import React, { useState } from 'react'
import { CButton, CCardBody, CContainer, CRow } from '@coreui/react'
import CelebrateSuccessfulSignUp from './celebrateSuccessfulSignup'

const SubscribeButton = ({ pubkey, setData }) => {
  const [showButtonDisplay, setShowButtonDisplay] = useState('block')
  const [showRequestSentDisplay, setShowRequestSentDisplay] = useState('none')
  const signUpToBrainstorm = () => {
    console.log('signUpToBrainstorm ' + pubkey)
    setShowButtonDisplay('none')
    setShowRequestSentDisplay('block')
    const url = `https://www.graperank.tech/api/customers/addNewCustomer?pubkey=${pubkey}`
    fetch(url)
      .then((response) => response.json())
      // .then(data => setResp(response))
      .then((data) => setData(data))
  }
  return (
    <>
      <CCardBody
        style={{
          display: showButtonDisplay,
        }}
      >
        <div className="d-grid gap-2 col-10 mx-auto">
          <CButton color="primary" size="lg" onClick={() => signUpToBrainstorm()}>
            Calculate my Webs of Trust
          </CButton>
          <div>This should take just a few minutes.</div>
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
            <center>
              <div className="d-flex justify-content-between flex-column">
                <div style={{ fontSize: '48px', marginBottom: '60px' }}>
                  the Grapevine &#127815;
                </div>
                <SubscribeButton pubkey={pubkey} setData={setData} />
              </div>
            </center>
          </div>
        </CRow>
      </CContainer>
    </>
  )
}

export default CustomerStatusDoesNotExist
