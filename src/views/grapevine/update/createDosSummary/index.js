import { CButton, CCard, CCardBody, CContainer, CCardTitle, CRow, CCol } from '@coreui/react'
import React, { useState } from 'react'

const SingleEndpointControlPanel = ({ pubkey, action }) => {
  const [showButtonDisplay, setShowButtonDisplay] = useState('block')
  const [showRequestSentDisplay, setShowRequestSentDisplay] = useState('none')
  const [data, setData] = useState({})
  const url =
    'https://interpretation-brainstorm.vercel.app/api/manageData/singleUser/createDosSummary?pubkey='+pubkey+'&nextStep=true'
  const triggerEndpoint = () => {
    console.log('triggerEndpoint')
    setShowButtonDisplay('none')
    setShowRequestSentDisplay('block')
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data))
  }
  return (
    <CContainer md style={{ marginTop: '50px' }}>
      <CRow className="justify-content-center">
        <CCol>
          <CCard className="w-100">
            <CCardBody>
              <center>
                <CCardTitle>Create DoS summary for my pubkey in table:dosSummaries</CCardTitle>
              </center>
            </CCardBody>
            <CCardBody>
              <div className="d-grid gap-2">{url}</div>
            </CCardBody>
            <CCardBody
              style={{
                display: showRequestSentDisplay,
              }}
            >
              <div>Request sent.</div>
              <div>Response from the engine:</div>
              <pre>{JSON.stringify(data, null, 4)}</pre>
            </CCardBody>
            <CCardBody
              style={{
                display: showButtonDisplay,
              }}
            >
              <div>
                <CButton color="primary" onClick={() => triggerEndpoint()}>
                  Trigger Endpoint
                </CButton>
                <span style={{ marginLeft: '20px' }}>{action}</span>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default SingleEndpointControlPanel
