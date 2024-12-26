import { CButton, CCard, CCardBody, CContainer, CRow, CCol, CTable } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import TanstackTable from './tanstack'
import { noProfilePicUrl } from 'src/const'
import PulseLoader from 'react-spinners/PulseLoader'
import { safeNpubEncodeOrError } from '../../../../helpers/nip19'

const TableWhenReady = ({ tableReady, tableData, tableConfig }) => {
  if (!tableReady)
    return (
      <div>
        downloading data from the Brainstorm server (big file; may take up to a minute){' '}
        <div style={{ display: 'inline-block' }}>
          <PulseLoader />
        </div>
      </div>
    )
  return (
    <>
      <TanstackTable defaultData={tableData} tableConfig={tableConfig} />
    </>
  )
}

const DisplayDosSummary = ({ dosDataToShow }) => {
  const items = [
    { hops: 0, num_users: 1 },
    { hops: 1, num_users: 5 },
  ]
  const columns = [
    {
      key: 'hops',
      _props: { scope: 'col' },
    },
    {
      key: 'num_users',
      label: '# of users',
      _props: { scope: 'col' },
    },
  ]
  const aDataItemKeys = Object.keys(dosDataToShow)
  const aItems = []
  for (let x = 0; x < aDataItemKeys.length; x++) {
    const nextKey = aDataItemKeys[x]
    const nextVal = dosDataToShow[nextKey]
    // console.log(`nextKey: ${nextKey}`)
    // console.log(`nextVal: ${nextVal}`)
    const oNextRow = { hops: nextKey, num_users: nextVal }
    aItems.push(oNextRow)
  }
  return (
    <>
      <CTable columns={columns} items={aItems} />
    </>
  )
}

const ProfilesTable = ({ pubkey, tableConfig }) => {
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
      let showAll = false
      if (tableConfig.aPubkeys.length == 0) {
        showAll = true
      }
      for (let s = 0; s < aScores.length; s++) {
        const pk = aScores[s]
        if (showAll || tableConfig.aPubkeys.includes(pk)) {
          const aScore = oScores[pk]
          const dos = aScore[0]
          const personalizedPageRank = aScore[1]
          const logPersonalizedPageRank = Math.log10(personalizedPageRank)
          const grapeRank_average = aScore[2]
          const grapeRank_confidence = aScore[3]
          let grapeRank_influence = grapeRank_average * grapeRank_confidence
          if (grapeRank_average < 0) {
            grapeRank_influence = 0
          }
          if (!oDosData[dos]) {
            oDosData[dos] = 0
          }
          oDosData[dos]++

          const oNewEntry = {
            id: 'id',
            pubkey: pk,
            npub: safeNpubEncodeOrError(pk), // npubEncode(pk)
            picture: noProfilePicUrl,
            displayName: 'alice',
            influence: Number(grapeRank_influence.toPrecision(3)),
            average: grapeRank_average,
            confidence: grapeRank_confidence,
            personalizedPageRank: Number(personalizedPageRank.toPrecision(3)),
            logPersonalizedPageRank: logPersonalizedPageRank,
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
        setExists('fetchWebsOfTrust/composite endpoint failed')
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
      <center>
        <h4>Your Webs of Trust</h4>
      </center>
      <CRow className="justify-content-center">
        <CCard className="w-100">
          <CCardBody
            style={{
              display: 'block',
            }}
          >
            <TableWhenReady
              tableReady={tableReady}
              tableData={tableData}
              tableConfig={tableConfig}
            />
          </CCardBody>
        </CCard>
        <br />
        <CCard className="w-100">
          <CCardBody style={{ display: tableConfig.displayDosTable }}>
            <center>
              <h4>Your Follows Network</h4>
              <DisplayDosSummary dosDataToShow={dosDataToShow} />
            </center>
          </CCardBody>
        </CCard>
      </CRow>
    </CContainer>
  )
}

export default ProfilesTable

/*
  const oProfilesByNpub = {}
  const aPubkeysToDisplay = []

<TanstackProfilesTable
  aPubkeysToDisplay={aPubkeysToDisplay}
  oProfilesByNpub={oProfilesByNpub}
/>
*/
