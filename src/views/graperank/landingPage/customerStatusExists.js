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
                  <CCardTitle>
                    Your Grapevine was last calculated {howLongAgo}, using parameters:
                  </CCardTitle>
                </center>
                <div style={{ marginLeft: '50px' }}>
                  <div>
                    <div style={{ display: 'inline-block', width: '300px' }}>rigor:</div>
                    <div style={{ display: 'inline-block' }}>
                      {grapeRankParams.paramsAtLastImplementation.rigor}
                    </div>
                  </div>
                  <div>
                    <div style={{ display: 'inline-block', width: '300px' }}>attenuationFactor:</div>
                    <div style={{ display: 'inline-block' }}>
                      {grapeRankParams.paramsAtLastImplementation.attenuationFactor}
                    </div>
                  </div>
                  <div>
                    <div style={{ display: 'inline-block', width: '300px' }}>followRating:</div>
                    <div style={{ display: 'inline-block' }}>
                      {grapeRankParams.paramsAtLastImplementation.followRating}
                    </div>
                  </div>
                  <div>
                    <div style={{ display: 'inline-block', width: '300px' }}>followConfidence:</div>
                    <div style={{ display: 'inline-block' }}>
                      {grapeRankParams.paramsAtLastImplementation.followConfidence}
                    </div>
                  </div>
                  <div>
                    <div style={{ display: 'inline-block', width: '300px' }}>muteRating:</div>
                    <div style={{ display: 'inline-block' }}>
                      {grapeRankParams.paramsAtLastImplementation.muteRating}
                    </div>
                  </div>
                  <div>
                    <div style={{ display: 'inline-block', width: '300px' }}>muteConfidence:</div>
                    <div style={{ display: 'inline-block' }}>
                      {grapeRankParams.paramsAtLastImplementation.muteConfidence}
                    </div>
                  </div>
                  <div>
                    <div style={{ display: 'inline-block', width: '300px' }}>followConfidenceOfObserver:</div>
                    <div style={{ display: 'inline-block' }}>
                      {grapeRankParams.paramsAtLastImplementation.followConfidenceOfObserver}
                    </div>
                  </div>
                </div>
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
