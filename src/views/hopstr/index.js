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

const AppDashboard = () => {
  return (
    <>
      <CContainer>
        <CRow className="justify-content-center" xs={{ gutter: 4 }}>
          <center>
            <h3>HOPSTR</h3>
          </center>
        </CRow>
        <br />
        <CRow className="justify-content-center" xs={{ gutter: 4 }}>
          <CCol xs={12} sm={6} xl={4} xxl={3}>
            <CCard
              style={{ width: '100%', height: '100%' }}
              className="mb-3 border-primary"
              textColor="primary"
            >
              <CNavLink style={{ display: 'inline-block' }} href="#/hopstr/followsNetwork">
                <CCardHeader>
                  <strong>Follows Network</strong>
                </CCardHeader>
                <CCardBody>
                  <CCardText>Find profiles 3, 4, and more hops away!</CCardText>
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
              <CNavLink style={{ display: 'inline-block' }} href="#/hopstr/shortestPath">
                <CCardHeader>
                  <strong>Shortest Path</strong>
                </CCardHeader>
                <CCardBody>
                  <CCardText>Find the shortest path between any two given npubs.</CCardText>
                </CCardBody>
              </CNavLink>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </>
  )
}

export default AppDashboard
