import { CButton, CCard, CCardBody, CContainer, CRow, CCol, CTable } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import TanstackTable from './tanstack'
// import { oPubkeyLookup } from '../../../../const/pubkeyLookup'
import { noProfilePicUrl } from 'src/const'
import PulseLoader from 'react-spinners/PulseLoader'

const TableWhenReady = ({ tableReady, tableData }) => {
  if (!tableReady)
    return (
      <div>
        downloading data (should take about 10 seconds){' '}
        <div style={{ display: 'inline-block' }}>
          <PulseLoader />
        </div>
      </div>
    )
  return <TanstackTable defaultData={tableData} />
}

const DisplayDosSummary = ({dosDataToShow}) => {
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
  const items = []
  for (let x=0; x < aDataItemKeys.length; x++) {
    const nextKey = aDataItemKeys[x]
    if (nextKey.substring(0,3) == 'dos') {
      const nextDosNumHops = nextKey.substring(3)
      const nextDosValue = dosDataToShow[nextKey]
      if (nextDosValue > 0) {
        // console.log(`nextKey: ${nextKey}; nextDosNumHops: ${nextDosNumHops}, nextDosValue: ${nextDosValue}`)
        const oNextItem = { hops: nextDosNumHops, num_users: nextDosValue }
        items.push(oNextItem)
      }
    }
  }
  return <CTable columns={columns} items={items} />
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
      const oPubkeyLookup = data.data.pubkeyLookupByUserId
      const dosData = data.data.dosData.dosData
      setDosDataToShow(dosData)
      // console.log(`dosData: ${JSON.stringify(dosData, null, 4)}`)
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
      // let myId = 0
      for (let x = 0; x < aObservees.length; x++) {
        const observeeId = aObservees[x]
        const influence = oRatees[observeeId].influence
        // const pk = oPubkeyLookup.data.observerObjectDataById[observeeId].pubkey
        const pk = oPubkeyLookup[observeeId]?.pubkey
        /*
        if (pk == pubkey) {
          myId = observeeId
          console.log(`my pk: ${pk}; myId: ${myId}; `)
        }
        */
        let dosThisUser = 999
        for (let z = 0; z < aDosToCheck.length; z++) {
          const dosToCheck = aDosToCheck[z]
          const aUserIds = oLookupIdsByDos[dosToCheck]
          if (aUserIds && aUserIds.includes(Number(observeeId))) {
            dosThisUser = dosToCheck
            /*
            if (observeeId == myId) {
              console.log(`myId: ${myId}; my dos: ${dosThisUser}`)
            }
            */
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

  useEffect(() => {
    triggerEndpoint()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <CContainer md>
      <CRow className="justify-content-center">
        <CCol>
          <CCard className="w-100">
            <CCardBody>
              <center>
                <h3>Your WoT Networks</h3>
                <h4>DoS WoT Network: all users connected to you by follows</h4>
                <DisplayDosSummary dosDataToShow={dosDataToShow} />
                <h4>Grapevine WoT Network: all users with a nonzero Grapevine WoT Influence Score</h4>
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
