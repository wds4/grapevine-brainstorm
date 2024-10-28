import React from 'react'
import { CCard, CCardBody, CContainer, CRow, CCardTitle, CCol } from '@coreui/react'

const CustomerStatusExists = ({ pubkey }) => {
  return (
    <>
      <CContainer md style={{ marginTop: '50px' }}>
        <CRow className="justify-content-center">
          <CCol>
            <CCard className="w-100">
              <CCardBody>
                <center>
                  <CCardTitle>You are a customer.</CCardTitle>
                </center>
                <li>go to table</li>
                <li>go to worldviews</li>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </>
  )
}

export default CustomerStatusExists
