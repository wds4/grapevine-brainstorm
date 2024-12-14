import { CButton, CCard, CCardBody, CContainer, CRow, CCol, CTable } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import TanstackTable from './tanstack'
import { noProfilePicUrl } from 'src/const'
import PulseLoader from 'react-spinners/PulseLoader'
import { npubEncode } from 'nostr-tools/nip19'

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
  return (
    <>
      <TanstackTable defaultData={tableData} />
    </>
  )
}

const SingleEndpointControlPanel = ({ observer, pubkey }) => {
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
      const aFollowers = data.data.ratings['3']
      console.log(`numFollowers: ${aFollowers.length}`)
      const aScorecardsData = []
      const oDosData = {}
      for (let f = 0; f < aFollowers.length; f++) {
        const oFollower = aFollowers[f]
        const pk = oFollower.rator
        const dos = oFollower.dos
        const pagerank = oFollower.pagerank
        const influence = oFollower.grapeRank_dos.influence
        const oNewEntry = {
          id: 'id',
          pubkey: pk,
          npub: npubEncode(pk),
          picture: noProfilePicUrl,
          displayName: 'alice',
          influence: influence,
          personalizedPageRank: pagerank,
          degreeOfSeparation: dos,
        }
        aScorecardsData.push(oNewEntry)
      }
      // display populated table
      setTableData(aScorecardsData)
      setDosDataToShow(oDosData)
      setTableReady(true)
      setShowRequestSentDisplay('block')
    }
  }
  const url = `https://www.graperank.tech/api/outwardFacing/getDataForOtherProfilePage?observer=${observer}&observee=${pubkey}`
  console.log(url)
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
                <h3>Followers of this profile</h3>
              </center>
            </CCardBody>
            <CCardBody
              style={{
                display: 'block',
              }}
            >
              <TableWhenReady tableReady={tableReady} tableData={tableData} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default SingleEndpointControlPanel

