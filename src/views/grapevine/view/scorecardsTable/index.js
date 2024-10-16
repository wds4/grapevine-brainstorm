import { CButton, CCard, CCardBody, CContainer, CCardTitle, CRow, CCol } from '@coreui/react'
import React, { useState } from 'react'

const SingleEndpointControlPanel = ({ pubkey }) => {
  const [showButtonDisplay, setShowButtonDisplay] = useState('block')
  const [showRequestSentDisplay, setShowRequestSentDisplay] = useState('none')
  const [scorecards, setScorecards] = useState({})
  const [numAbove9, setNumAbove9] = useState(0)
  const [numZero, setNumZero] = useState(0)
  const [numOther, setNumOther] = useState(0)
  const [message, setMessage] = useState(
    'Request sent; awaiting response from the Brainstorm Calculation Engine...',
  )
  const processData = (data) => {
    // setData(data)
    const success = data.success
    const message = data.message

    setMessage(message)
    const exists = data.exists
    const oScorecards = data.data.scorecardsData.scorecards
    setScorecards(oScorecards)
    const myUserId = Object.keys(oScorecards.notSpam)[0] // workaround hack until I revamp data format
    const oRatees = oScorecards.notSpam[myUserId]

    const aObservees = Object.keys(oRatees)
    let nAbove9 = 0
    let nZero = 0
    let nOther = 0
    for (let x=0; x < aObservees.length; x++) {
      const observeeId = aObservees[x]
      const influence = oRatees[observeeId].influence
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
    setNumAbove9(nAbove9)
    setNumZero(nZero)
    setNumOther(nOther)

    const aContexts = data.data.scorecardsData.contexts
    const numObservers = data.data.scorecardsData.numObservers
    const numObservations = data.data.scorecardsData.numObservations
    const megabytes = data.data.scorecardsData.megabytes

  }
  const url =
    'https://calculation-brainstorm.vercel.app/api/grapevine/showStoredScorecardsTable?name=notSpam&pubkey=' +
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
                <CCardTitle>Scorecards Table</CCardTitle>
              </center>
            </CCardBody>
            <CCardBody>
              <div className="d-grid gap-2">{url}</div>
            </CCardBody>
            <CCardBody
              style={{
                display: showRequestSentDisplay,
              }}
            >
              <div>{message}</div>
              <div>numAbove9: {numAbove9}</div>
              <div>numZero: {numZero}</div>
              <div>numOther: {numOther}</div>
              <pre>{JSON.stringify(scorecards, null, 4)}</pre>
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
