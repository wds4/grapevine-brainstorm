import React from 'react'
import { CCard, CCardBody, CContainer, CRow, CCardTitle, CCol } from '@coreui/react'

const CustomerStatusExists = ({ pubkey }) => {
  return (
    <>
      <CContainer md>
        <CRow className="justify-content-center">
          <CCol>
            <CCard className="w-100">
              <CCardBody>
                <center>
                  <CCardTitle>Your Grapevine has been calculated.</CCardTitle>
                </center>
                <li>
                  click on My Web of Trust (left) to see your Grapevine and to export results into
                  NIP-51 lists
                </li>
                <li>Coming soon: Nostr Dev lists and other Worldviews</li>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </>
  )
}

export default CustomerStatusExists
