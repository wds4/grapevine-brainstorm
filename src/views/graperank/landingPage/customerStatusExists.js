import React from 'react'
import {
  CCard,
  CCardBody,
  CContainer,
  CRow,
  CCardTitle,
  CCol,
  CNavLink,
  CCardHeader,
  CCardText,
} from '@coreui/react'
import WotHighlightsNav from 'src/views/graperank/components/wotHighlightsNav'
import { secsToTimeAgo } from '../../../helpers'

const CustomerStatusExists = ({ pubkey, grapeRankParams }) => {
  const howLongAgo = secsToTimeAgo(grapeRankParams?.whenLastImplemented)
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
                <center>
                  Navigate to{' '}
                  <div style={{ display: 'inline-block', color: 'blue' }}>
                    <CNavLink href="#/settings">Settings</CNavLink>
                  </div>{' '}
                  to adjust parameters and recalculate your Grapevine.
                </center>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
      <br />
      <WotHighlightsNav pubkey={pubkey} />
    </>
  )
}

export default CustomerStatusExists
