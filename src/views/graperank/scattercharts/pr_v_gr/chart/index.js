import { CButton, CCard, CCardBody, CContainer, CRow, CCol, CTable } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { noProfilePicUrl } from 'src/const'
import PulseLoader from 'react-spinners/PulseLoader'
import { npubEncode } from 'nostr-tools/nip19'
import { Chart } from 'react-google-charts'

const ScatterplotWhenReady = ({ tableReady, tableData }) => {
  if (!tableReady)
    return (
      <div>
        downloading data (should take about 10 seconds){' '}
        <div style={{ display: 'inline-block' }}>
          <PulseLoader />
        </div>
      </div>
    )
  const aData = []
  aData.push(['PageRank', 'pubkey'])
  for (let x = 1; x < Math.min(3000, tableData.length); x++) {
    const oNextUser = tableData[x * 60]
    const influence = oNextUser.influence
    const pageRank = oNextUser.personalizedPageRank
    const logPageRank = Math.log10(pageRank)
    const dos = oNextUser.degreeOfSeparation
    if (dos < 20) {
      aData.push([logPageRank, influence])
    }
  }
  return (
    <>
      <Chart
        chartType="ScatterChart"
        data={aData}
        style={{ height: '500px' }}
        options={{
          title: 'GrapeRank versus PageRank for determination of your Web of Trust',
          hAxis: { title: 'log(Personalized PageRank)' },
          vAxis: { title: 'GrapeRank (Influence)' },
        }}
        legendToggle
      />
    </>
  )
}

const SingleEndpointControlPanel = ({ pubkey }) => {
  const [tableData, setTableData] = useState([])
  const [tableReady, setTableReady] = useState(false)
  const [showButtonDisplay, setShowButtonDisplay] = useState('block')
  const [showRequestSentDisplay, setShowRequestSentDisplay] = useState('none')
  const [dosDataToShow, setDosDataToShow] = useState({})
  const processData = (data) => {
    const success = data.success
    if (!success) {
      // display empty table
      setTableReady(true)
      // TODO: display error message that data has not been calculated
    }
    if (success) {
      const oCombinedWebsOfTrust = data.data.oCombinedWebsOfTrust
      const whenLastUpdated_synthesis = oCombinedWebsOfTrust.metaData.whenLastUpdated.synthesis
      const whenLastUpdated_dos = oCombinedWebsOfTrust.metaData.whenLastUpdated.dos
      const whenLastUpdated_personalizedPageRank =
        oCombinedWebsOfTrust.metaData.whenLastUpdated.personalizedPageRank
      const oScores = oCombinedWebsOfTrust.data.scores
      const aScores = Object.keys(oScores)
      const aScorecardsData = []
      const oDosData = {}
      for (let s = 0; s < aScores.length; s++) {
        const pk = aScores[s]
        if (pk != 'undefined') {
          const aScore = oScores[pk]
          // console.log(`s: ${s}; oScores: ${JSON.stringify(oScores[pk])}; pk: ${pk}`)
          const dos = aScore[0]
          const personalizedPageRank = aScore[1]
          const grapeRank_average = aScore[2]
          const grapeRank_confidence = aScore[3]
          let grapeRank_influence = grapeRank_average * grapeRank_confidence
          if (grapeRank_influence < 0) {
            grapeRank_influence = 0
          }
          if (grapeRank_average < 0) {
            grapeRank_influence = 0
          }
          if (dos == 999) {
            grapeRank_influence = 0
          }
          if (!oDosData[dos]) {
            oDosData[dos] = 0
          }
          oDosData[dos]++

          /*
          if ((grapeRank_influence > 0.8) && (Math.log10(personalizedPageRank) < -6)) {
            console.log(`qwerty pk: ${pk}; average: ${grapeRank_average}; confidence: ${grapeRank_confidence}; influence: ${grapeRank_influence}`)
          }
          */

          const oNewEntry = {
            id: 'id',
            pubkey: pk,
            npub: npubEncode(pk),
            picture: noProfilePicUrl,
            displayName: 'alice',
            influence: grapeRank_influence,
            personalizedPageRank: personalizedPageRank,
            degreeOfSeparation: dos,
          }
          aScorecardsData.push(oNewEntry)
        }
      }
      setTableData(aScorecardsData)
      setDosDataToShow(oDosData)
      // display populated table
      setTableReady(true)
      setShowRequestSentDisplay('block')
    }
  }
  const url = `https://graperank.tech/api/s3/fetchWebsOfTrust/composite?pubkey=${pubkey}`
  async function fetchData(url) {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      // console.log(`fetchData: ${JSON.stringify(data)}`)
      if (!data.success) {
        setExists('DoS calculations failed')
      }
      if (data.success) {
        if (data.exists) {
          processData(data)
        }
      }
      return data
    } catch (error) {
      console.error('api/s3/fetchWebsOfTrust/composite endpoint error:', error)
    }
  }

  useEffect(() => {
    fetchData(url)
  }, [])

  return (
    <CContainer md>
      <CRow className="justify-content-center">
        <CCol>
          <CCard className="w-100">
            <CCardBody>
              <center>
                <h4>GrapeRank versus PageRank</h4>
              </center>
              <ScatterplotWhenReady tableReady={tableReady} tableData={tableData} />
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
