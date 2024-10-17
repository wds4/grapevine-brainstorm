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
    const success = data.success
    if (!success) {
      // display empty table
      setTableReady(true)
      // TODO: display error message that data has not been calculated
    }
    if (success) {
      const oPubkeyLookup = data.data.pubkeyLookupByUserId
      const oLookupIdsByDos = data.data.dosData.lookupIdsByDos
      const oScorecards = data.data.scorecardsData.scorecards
      const myUserId = Object.keys(oScorecards.notSpam)[0] // workaround hack until I revamp data format
      const oRatees = oScorecards.notSpam[myUserId]

      const aObservees = Object.keys(oRatees)
      let nAbove9 = 0
      let nZero = 0
      let nOther = 0
      const aScorecardsData = []
      const aDosToCheck = Object.keys(oLookupIdsByDos)
      for (let x = 0; x < aObservees.length; x++) {
        const observeeId = aObservees[x]
        const influence = oRatees[observeeId].influence
        // const pk = oPubkeyLookup.data.observerObjectDataById[observeeId].pubkey
        const pk = oPubkeyLookup[observeeId].pubkey
        let dosThisUser = 999
        for (let z = 0; z < aDosToCheck.length; z++) {
          const dosToCheck = aDosToCheck[z]
          const aUserIds = oLookupIdsByDos[dosToCheck]
          if (aUserIds && aUserIds.includes(Number(observeeId))) {
            dosThisUser = dosToCheck
          }
        }
        const oNewEntry = {
          id: observeeId,
          pubkey: pk,
          npub: 'npub',
          picture: noProfilePicUrl,
          displayName: 'alice',
          influence,
          degreeOfSeparation: Number(dosThisUser),
        }
        aScorecardsData.push(oNewEntry)
        if (influence > 0.9) {
          nAbove9++
        } else {
          if (influence == 0) {
            nZero++
          } else {
            nOther++
          }
        }
      }
      setTableData(aScorecardsData)

      const aContexts = data.data.scorecardsData.contexts
      const numObservers = data.data.scorecardsData.numObservers
      const numObservations = data.data.scorecardsData.numObservations
      const megabytes = data.data.scorecardsData.megabytes
      setTableReady(true)
    }
  }
  const url =
    'https://calculation-brainstorm.vercel.app/api/grapevine/showFullStoredReport?name=notSpam&pubkey=' +
    pubkey
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
