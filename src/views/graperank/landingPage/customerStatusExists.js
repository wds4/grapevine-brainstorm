import React from 'react'
import { CCard, CCardBody, CContainer, CRow, CCardTitle, CCol, CNavLink } from '@coreui/react'
import { secsToTimeAgo } from '../../../helpers'
// import RecalculateGrapeRank from './recalculateGrapeRank'

const CustomerStatusExists = ({ pubkey, grapeRankParams }) => {
  const howLongAgo = secsToTimeAgo(grapeRankParams?.whenLastImplemented)
  const myFollowersHref = `#/profile/followers?pubkey=${pubkey}`
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
                  Navigate to{' '}
                  <div style={{ display: 'inline-block', color: 'blue' }}>
                    <CNavLink href="#/profiles">My Webs of Trust</CNavLink>
                  </div>{' '}
                  (left) to see your Grapevine and to export results into NIP-51 lists.
                </li>
                <li>
                  Ever wonder how many of your followers are "real" (not bots or spam)?
                  Navigate to{' '}
                  <div style={{ display: 'inline-block', color: 'blue' }}>
                    <CNavLink href={myFollowersHref} >my followers</CNavLink>
                  </div>{' '}
                  to sort your followers by GrapeRank score.
                </li>
                <li>
                  Navigate to Scattercharts (left) to compare and contrast three different ways to
                  define your WoT Network: GrapeRank, PageRank, and DoS.
                </li>
                <li>
                  Navigate to{' '}
                  <div style={{ display: 'inline-block', color: 'blue' }}>
                    <CNavLink href="#/settings">Settings</CNavLink>
                  </div>{' '}
                  to adjust parameters and recalculate your Grapevine.
                </li>
                <br />
                <li>
                  Coming soon: Nostr Dev lists and other{' '}
                  <div style={{ display: 'inline-block', color: 'blue' }}>
                    <CNavLink href="#/worldviews">Worldviews</CNavLink>
                  </div>
                </li>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </>
  )
}

export default CustomerStatusExists
