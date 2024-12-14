import React from 'react'
import { CCard, CCardBody, CContainer, CRow, CCardTitle, CCol } from '@coreui/react'
import { secsToTimeAgo } from '../../../helpers'
// import RecalculateGrapeRank from './recalculateGrapeRank'

const CustomerStatusExists = ({ pubkey, grapeRankParams }) => {
  const howLongAgo = secsToTimeAgo(grapeRankParams.whenLastImplemented)

  return (
    <>
      <CContainer md>
        <CRow className="justify-content-center">
          <CCol>
            <CCard className="w-100">
              <CCardBody>
                <center>
                  <CCardTitle>Your Grapevine was last calculated {howLongAgo}.</CCardTitle>
                </center>
                <li>
                  click on My Web of Trust (left) to see your Grapevine and to export results into
                  NIP-51 lists
                </li>
                <li>Navigate to Settings to adjust parameters and recalculate your Grapevine.</li>
                <br />
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
