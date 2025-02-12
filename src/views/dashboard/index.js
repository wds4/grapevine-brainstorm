import React from 'react'
import { CContainer, CNavLink, CRow } from '@coreui/react'
import { CCard, CCardBody, CCardHeader, CCardText, CCol } from '@coreui/react'

const Dashboard = () => {
  return (
    <>
      <center>
        <h3>Brainstorm: Apps under development</h3>
      </center>
      <br />
      <br />
      <CContainer>
        <CRow xs={{ gutter: 4 }}>
          <CCol xs={12} sm={6} xl={4} xxl={3}>
            <CCard
              style={{ width: '100%', height: '100%' }}
              className="mb-3 border-primary"
              textColor="primary"
            >
              <CNavLink style={{ display: 'inline-block' }} href="#/grapevine">
                <CCardHeader>
                  <strong>Grapevine</strong>
                </CCardHeader>
                <CCardBody>
                  <CCardText>Manage your Grapevine WoT Network</CCardText>
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
              <CNavLink style={{ display: 'inline-block' }} href="#/graperank">
                <CCardHeader>
                  <strong>GrapeRank</strong>
                </CCardHeader>
                <CCardBody>
                  <CCardText>Refactoring the Grapevine using neo4j!</CCardText>
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
                  <CCardText>Lorem ipsum!</CCardText>
                </CCardBody>
              </CNavLink>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </>
  )
}

export default Dashboard
