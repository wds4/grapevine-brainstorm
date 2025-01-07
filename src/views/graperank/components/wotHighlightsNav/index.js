import React from 'react'
import {
  CCard,
  CCardBody,
  CContainer,
  CRow,
  CCol,
  CNavLink,
  CCardHeader,
  CCardText,
} from '@coreui/react'

const WotHighlightsNav = ({ pubkey }) => {
  const myFollowersHref = `#/profile/followers?pubkey=${pubkey}`
  return (
    <CContainer>
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
                <CCardText>Table of over 200,000 nostr profiles showing all 3 WoT scores</CCardText>
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
            <CNavLink style={{ display: 'inline-block' }} href="#/hopstr/followsNetwork">
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
  )
}

export default WotHighlightsNav
