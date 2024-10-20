import { CButton, CCard, CCardBody, CContainer, CCardTitle, CRow, CCol } from '@coreui/react'
import React, { useState } from 'react'
import TanstackTable from './tanstack'
// import { oPubkeyLookup } from '../../../../const/pubkeyLookup'
import { noProfilePicUrl } from '../../../../const'

const TableWhenReady = ({ tableReady, tableData }) => {
  if (!tableReady) return <div>preparing table data</div>
  return <TanstackTable defaultData={tableData} />
}

const SingleEndpointControlPanel = ({ pubkey }) => {
  const [tableData, setTableData] = useState([])
  const [tableReady, setTableReady] = useState(false)
  const [showButtonDisplay, setShowButtonDisplay] = useState('block')
  const [showRequestSentDisplay, setShowRequestSentDisplay] = useState('none')
  const processData = (data) => {
    console.log(`typeof data: ${data.length}`)
    const aScorecardsData = []
    for (let x=0; x < data.length; x++) {
      const oCloudcard = data[x]
      const observeePubkey = oCloudcard.PubkeyHex
      const observeeScore = oCloudcard.Score
      const oNewEntry = {
        id: x,
        pubkey: observeePubkey,
        npub: 'npub',
        picture: noProfilePicUrl,
        displayName: 'alice',
        influence: observeeScore,
        degreeOfSeparation: -1,
      }
      aScorecardsData.push(oNewEntry)
    }
    setTableData(aScorecardsData)
    setTableReady(true)
  }
  const url = 'https://gv.rogue.earth/api/members/' + pubkey + '/gvscores'
  const triggerEndpoint = () => {
    console.log('triggerEndpoint')
    setShowButtonDisplay('none')
    setShowRequestSentDisplay('block')
    fetch(url)
      .then((response) => response.json())
      .then((data) => processData(data))
  }

  return (
    <CContainer md style={{ marginTop: '50px' }}>
      <CRow className="justify-content-center">
        <CCol>
          <CCard className="w-100">
            <CCardBody>
              <center>
                <p style={{ fontSize: '34px' }}>Your WoT Networks</p>
                <p>Grapevine WoT Network: all users with a nonzero Grapevine WoT Influence Score</p>
                <p>DoS WoT Network: all users connected to you by at least one follows path</p>
                <p>url: {url}</p>
              </center>
            </CCardBody>
            <CCardBody
              style={{
                display: showRequestSentDisplay,
              }}
            >
              <TableWhenReady tableReady={tableReady} tableData={tableData} />
            </CCardBody>
            <CCardBody
              style={{
                display: showButtonDisplay,
              }}
            >
              <div>
                <CButton color="primary" onClick={() => triggerEndpoint()}>
                  Trigger Endpoint
                </CButton>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default SingleEndpointControlPanel

/*
  const oProfilesByNpub = {}
  const aPubkeysToDisplay = []

<TanstackProfilesTable
  aPubkeysToDisplay={aPubkeysToDisplay}
  oProfilesByNpub={oProfilesByNpub}
/>
*/
