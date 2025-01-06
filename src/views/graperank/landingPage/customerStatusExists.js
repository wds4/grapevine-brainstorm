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

        <br />

        <CRow className="justify-content-center" xs={{ gutter: 4 }}>
          <CCol xs={12} sm={6} xl={4} xxl={3}>
            <CCard
              style={{ width: '100%', height: '100%' }}
              className="mb-3 border-primary"
              textColor="primary"
            >
              <CNavLink style={{ display: 'inline-block' }} href={myFollowersHref}>
                <CCardHeader>
                  <strong>My Followers</strong>
                </CCardHeader>
                <CCardBody>
                  <CCardText>Sort your followers by their WoT scores.</CCardText>
                </CCardBody>
              </CNavLink>
            </CCard>
          </CCol>

          <CCol xs={12} sm={6} xl={4} xxl={3}>
            <CCard
              style={{ width: '100%', height: '100%' }}
              className="mb-3 border-primary"
              textColor="primary"
            >
              <CNavLink style={{ display: 'inline-block' }} href="#/profiles">
                <CCardHeader>
                  <strong>My Webs of Trust</strong>
                </CCardHeader>
                <CCardBody>
                  <CCardText>Table of profiles showing all 3 WoT scores.</CCardText>
                </CCardBody>
              </CNavLink>
            </CCard>
          </CCol>

          <CCol xs={12} sm={6} xl={4} xxl={3}>
            <CCard
              style={{ width: '100%', height: '100%' }}
              className="mb-3 border-primary"
              textColor="success"
            >
              <CNavLink style={{ display: 'inline-block' }} href="#/hopstr">
                <CCardHeader>
                  <strong>Hopstr</strong>
                </CCardHeader>
                <CCardBody>
                  <CCardText>Find profiles 3, 4, and more hops away!</CCardText>
                </CCardBody>
              </CNavLink>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </>
  )
}

export default CustomerStatusExists
