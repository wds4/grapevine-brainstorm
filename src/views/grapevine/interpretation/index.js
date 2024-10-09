import React, { useState, useEffect } from 'react'
import { CButton, CCard, CCardBody, CContainer, CCardTitle, CRow } from '@coreui/react'
import { useActiveUser } from 'nostr-hooks'

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
const InterpretationDashboard = ({ pubkey }) => {
  const [resp, setResp] = useState({})
  const [data, setData] = useState({})
  const url =
    'https://calculation-brainstorm.vercel.app/api/grapevine/showStoredRatingsTable?name=default&pubkey=' +
    pubkey
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      // .then(data => setResp(response))
      .then((data) => setData(data))
  }, [])
  return (
    <>
      <center>
        <h3>Interpretation</h3>
      </center>
      <div>
        <p>your pubkey: {pubkey}</p>
      </div>
      <InterpretationProtocols />
      <div>ask calc engine to show my ratingsTable in calc engine storage using the url:</div>
      <div>{url}</div>
      <hr />
      <div>{JSON.stringify(data)}</div>
    </>
  )
}

const RetrieveActiveUser = () => {
  const { activeUser } = useActiveUser()
  if (!activeUser) return <div>retrieving the active user pubkey ...</div>
  return <InterpretationDashboard pubkey={activeUser.pubkey} />
}

export default RetrieveActiveUser
