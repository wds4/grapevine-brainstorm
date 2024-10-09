import React, { useState } from 'react'
import { CCard, CCardBody, CContainer, CCardTitle, CRow, CButton } from '@coreui/react'

/*
see: Using Curl in ReactJS
https://medium.com/@alexandr.fework/curl-is-a-command-line-tool-used-for-making-http-requests-e2ab67aa4672
*/

const MakeRatingsTable = ({ pubkey }) => {
  const [data, setData] = useState({})
  const url =
    'https://calculation-brainstorm.vercel.app/api/grapevine/requestRatingsTableUpdate?pubkey=' +
    pubkey
  const requestRatingsTableUpdate = () => {
    console.log('requestRatingsTableUpdate')
    fetch(url)
      .then((response) => response.json())
      // .then(data => setResp(response))
      .then((data) => {
        setData(data)
      })
  }

  return (
    <>
      <CContainer md style={{ marginTop: '50px' }}>
        <CRow className="justify-content-center">
          <div className="col-auto">
            <CCard className="w-80">
              <CCardBody>
                <center>
                  <CCardTitle>Request Ratings Table</CCardTitle>
                </center>
              </CCardBody>
              <CCardBody>
                <div className="d-grid gap-2">
                  <div>
                    If you are registered at Brainstorm, use the button below either to create a new
                    or to update an existing Ratings Table. This site will send a request to the
                    calculation engine, which sends a request to the interp engine using the below
                    url, which sends a full Ratings Table back to the Calculation Engine which
                    stores it for later usage.
                  </div>
                  <div>{url}</div>
                  <hr />
                </div>
              </CCardBody>
              <CCardBody>
                <div className="d-grid gap-2">
                  <CButton color="primary" onClick={() => requestRatingsTableUpdate()}>
                    Make new (or Update Existing) Ratings Table
                  </CButton>
                </div>
              </CCardBody>
              <CCardBody>
                <div style={{ maxHeight: '200px', overflow: 'scroll' }}>
                  <pre>{JSON.stringify(data)}</pre>
                </div>
              </CCardBody>
            </CCard>
          </div>
        </CRow>
      </CContainer>
    </>
  )
}

export default MakeRatingsTable
