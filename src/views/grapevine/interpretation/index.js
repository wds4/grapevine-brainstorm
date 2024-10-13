import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CContainer, CCardTitle, CRow } from '@coreui/react'
import { useActiveUser } from 'nostr-hooks'
import MakeRatingsTable from './makeRatingsTable'

const InterpretationProtocols = () => {
  return (
    <CContainer md style={{ marginTop: '50px' }}>
      <CRow className="justify-content-center">
        <div className="col-auto">
          <CCard className="w-80">
            <CCardBody>
              <center>
                <CCardTitle>Interpretation Protocols</CCardTitle>
              </center>
            </CCardBody>
            <CCardBody>
              <div className="d-grid gap-2">
                <div>
                  Interpretation protocols are used to build Ratings Tables from data generated
                  elsewhere in the nostr ecosystem.
                </div>
                <div>The Brainstorm will soon support these interpretation protocols:</div>
                <li>
                  Grapevine WoT Network: interpret follows and mutes as endorsements to be (or not
                  to be) included in your Grapevine WoT network of not-spam, not-bots.
                </li>
                <li>
                  Nostr Devs: interpret inclusion in a NIP-51 list entitled <i>Nostr Devs</i> as an
                  attestation that the pubkey belongs to a nostr developer.
                </li>
              </div>
            </CCardBody>
          </CCard>
        </div>
      </CRow>
    </CContainer>
  )
}

const RatingsTableDoesNotExist = ({ pubkey }) => {
  return (
    <div>
      A Ratings Table named: default for the pubkey: {pubkey} was not found in the calculation
      engine database.
    </div>
  )
}

const RatingsTableExists = ({ pubkey, data }) => {
  const oDosStats = data.data.dosStats
  const oRatingsTableData = data.data.ratingsTableData
  const aContexts = oRatingsTableData.contexts
  return (
    <CContainer md style={{ marginTop: '50px', width: '90%' }}>
      <CRow lg className="justify-content-center">
        <div className="col-auto">
          <CCard className="w-80">
            <CCardBody>
              <center>
                <CCardTitle>Current Ratings Table Data</CCardTitle>
              </center>
              <p>
                These are the ratings currently stored in the Brainstorm Calculation Engine. They
                are what the Calc Engine uses when the GrapeRank algorithm is run and the Grapevine
                WoT is calculated.
              </p>
            </CCardBody>
            <CCardBody>
              <div>table name: {data.data.name}</div>
              <div>last updated: {data.data.lastUpdated}</div>
            </CCardBody>
            <CCardBody>
              <center>
                <CCardTitle>DoS WoT Network</CCardTitle>
                <p>(used to select the raters for the ratings table)</p>
              </center>
              <div>0 DoS: {oDosStats.dos0}</div>
              <div>1 DoS: {oDosStats.dos1}</div>
              <div>2 DoS: {oDosStats.dos2}</div>
              <div>3 DoS: {oDosStats.dos3}</div>
              <div>4 DoS: {oDosStats.dos4}</div>
            </CCardBody>
            <CCardBody>
              <div className="d-grid gap-2">
                <center>
                  <CCardTitle>Grapevine</CCardTitle>
                </center>
                <div>contexts: {JSON.stringify(aContexts)}</div>
                <div>numRaters: {data.data.ratingsTableData.numRaters}</div>
                <div>numRatings: {data.data.ratingsTableData.numRatings}</div>
                <div>megabytes: {data.data.ratingsTableData.megabytes}</div>
              </div>
            </CCardBody>
          </CCard>
        </div>
      </CRow>
    </CContainer>
  )
}

const QueryCalculationApi = ({ pubkey }) => {
  const [exists, setExists] = useState(' ... checking ...')
  const [data, setData] = useState({})
  const url =
    'https://calculation-brainstorm.vercel.app/api/grapevine/showStoredRatingsTable?name=default&pubkey=' +
    pubkey
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      // .then(data => setResp(response))
      .then((data) => {
        setData(data)
        if (!data.success) {
          setExists('query failed')
        }
        if (data.success) {
          if (data.exists) {
            setExists('YES')
          }
          if (!data.exists) {
            setExists('NO')
          }
        }
      })
  }, [])

  if (exists == 'YES') return <RatingsTableExists pubkey={pubkey} data={data} />
  if (exists == 'NO') return <RatingsTableDoesNotExist pubkey={pubkey} />

  return (
    <>
      <div>
        <div>
          ... asking calc engine to fetch my ratingsTable from the calculation engine storage using
          the table name: default and the pubkey: {pubkey}
        </div>
        <div>You can try it yourself! Just go to:</div>
        <div>{url}</div>
        <div>does table exist?: {exists}</div>
        <div>data:</div>
        <pre>{JSON.stringify(data, null, 4)}</pre>
      </div>
    </>
  )
}
const InterpretationDashboard = ({ pubkey }) => {
  return (
    <CContainer>
      <center>
        <h3>Interpretation</h3>
      </center>
      <InterpretationProtocols />
      <MakeRatingsTable pubkey={pubkey} />
      <QueryCalculationApi pubkey={pubkey} />
      <br />
      <br />
    </CContainer>
  )
}

const RetrieveActiveUser = () => {
  const { activeUser } = useActiveUser()
  if (!activeUser) return <div>retrieving the active user pubkey ...</div>
  return <InterpretationDashboard pubkey={activeUser.pubkey} />
}

export default RetrieveActiveUser
