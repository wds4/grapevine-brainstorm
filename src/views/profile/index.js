import { useActiveUser, useNdk } from 'nostr-hooks'
import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CContainer, CCardTitle, CRow, CCol } from '@coreui/react'
import { useSearchParams } from 'react-router-dom'
import { asyncFetchProfile } from 'src/helpers/ndk'
import ShowScoreCalculations_brainstorm from './showScoreCalculations_brainstorm'
import ShowScoreCalculations_gvEarth from './showScoreCalculations_gvRogue'
import { nip19 } from 'nostr-tools'
import { noProfilePicUrl } from 'src/const'
import FollowersTable from './followersTable'

const Profile = ({ activeUserPubkey }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [providedNpub, setProvidedNpub] = useState('')
  const [calculatedNpub, setCalculatedNpub] = useState('')
  const [providedPubkey, setProvidedPubkey] = useState('')
  const [profile, setProfile] = useState({})
  const [profilePicUrl, setProfilePicUrl] = useState(noProfilePicUrl)

  const [influence, setInfluence] = useState('?')
  const [confidence, setConfidence] = useState('?')
  const [dos, setDos] = useState('?')
  const [average, setAverage] = useState('?')
  const [input, setInput] = useState('?')

  const { ndk } = useNdk()

  useEffect(() => {
    let internalNpub = ''
    let internalPubkey = ''
    function updateUserDataFromUrl() {
      const npubFromUrl = searchParams.get('npub')
      if (npubFromUrl) {
        setProvidedNpub(npubFromUrl)
        internalNpub = npubFromUrl
      }
      const pubkeyFromUrl = searchParams.get('pubkey')
      if (pubkeyFromUrl) {
        setProvidedPubkey(pubkeyFromUrl)
        internalPubkey = pubkeyFromUrl
        const np = nip19.npubEncode(pubkeyFromUrl)
        setCalculatedNpub(np)
      }
    }
    updateUserDataFromUrl()
    const updateProfile = async () => {
      if (internalNpub) {
        const obj = {}
        obj.npub = internalNpub
        const oProfile = await asyncFetchProfile(ndk, obj)
        setProfile(oProfile)

        return true
      }
      if (internalPubkey) {
        const obj = {}
        obj.pubkey = internalPubkey
        const oProfile = await asyncFetchProfile(ndk, obj)
        setProfile(oProfile)
        return true
      }
      return false
    }
    updateProfile()
  }, [])

  console.log('Profile component rerender')

  if (JSON.stringify(profile) == '{}') {
    return (
      <div>
        profile with pubkey: {providedPubkey} and npub: {calculatedNpub} not found
      </div>
    )
  }
  return (
    <>
      <CContainer>
        <CRow>
          <CCol sm="auto">
            <div className="profileAvatarContainer">
              <img src={profile?.image} className="profileAvatarLarge" />
            </div>
          </CCol>
          <CCol auto>
            <center>
              <CCardTitle>{profile?.displayName}</CCardTitle>
            </center>
            <br />
            <div>{profile?.name}</div>
            <div>{providedPubkey}</div>
            <div>{calculatedNpub}</div>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="auto">
            <div style={{ width: '250px' }}>DoS (v1)</div>
          </CCol>
          <CCol>{dos}</CCol>
        </CRow>
        <CRow>
          <CCol sm="auto">
            <div style={{ width: '250px' }}>DoS (v2)</div>
          </CCol>
          <CCol>...</CCol>
        </CRow>
        <CRow>
          <CCol sm="auto">
            <div style={{ width: '250px' }}>PageRank (v2)</div>
          </CCol>
          <CCol>...</CCol>
        </CRow>

        <CRow>
          <CCol sm="auto">
            <div style={{ width: '250px' }}>GrapeRank (init from DoS only):</div>
          </CCol>
          <CCol>influence, average, input, confidence</CCol>
        </CRow>
        <CRow>
          <CCol sm="auto">
            <div style={{ width: '250px' }}>GrapeRank (one GrapeCalculation only):</div>
          </CCol>
          <CCol>influence, average, input, confidence</CCol>
        </CRow>
        <CRow>
          <CCol sm="auto">
            <div style={{ width: '250px' }}>GrapeRank (iterate to completion)</div>
          </CCol>
          <CCol>influence, average, input, confidence</CCol>
        </CRow>
        <CRow>
          <CCol sm="auto">
            <div style={{ width: '250px' }}>GrapeRank Verified?</div>
          </CCol>
          <CCol>yes vs no? green check vs (red flag? or simply unverified?)</CCol>
        </CRow>
        <CRow>
          <CCol sm="auto">
            <div style={{ width: '250px' }}>Number of Followers (v2)</div>
          </CCol>
          <CCol>may include bots</CCol>
        </CRow>
        <CRow>
          <CCol sm="auto">
            <div style={{ width: '250px' }}>Number of Verified Followers (v2)</div>
          </CCol>
          <CCol>...</CCol>
        </CRow>
        <CRow>
          <CCol sm="auto">
            <div style={{ width: '250px' }}>GrapeRank (v1):</div>
          </CCol>
          <CCol>
            influence: {influence}
            <br />
            average: {average}
            <br />
            input: {input}
            <br />
            confidence: {confidence * 100} %
          </CCol>
        </CRow>
        <CRow>
          <center>Followers (from neo4j)</center>
        </CRow>
      </CContainer>
      <FollowersTable observer={activeUserPubkey} pubkey={providedPubkey} />

      <div style={{ display: 'none' }}>
        <div style={{ border: '1px solid purple', padding: '10px' }}>
          <ShowScoreCalculations_brainstorm
            activeUserPubkey={activeUserPubkey}
            pubkey={providedPubkey}
            setInfluence={setInfluence}
            setConfidence={setConfidence}
            setDos={setDos}
            setAverage={setAverage}
            setInput={setInput}
          />
        </div>
        <div style={{ border: '1px solid purple', padding: '10px' }}>
          <ShowScoreCalculations_gvEarth
            activeUserPubkey={activeUserPubkey}
            pubkey={providedPubkey}
          />
        </div>
        <br />
        <div>
          <p>observee profile info:</p>
          <pre>{JSON.stringify(profile, null, 4)}</pre>
        </div>
      </div>
      <div style={{ marginBottom: '200px' }}></div>
    </>
  )
}

const RetrieveActiveUser = () => {
  const { activeUser } = useActiveUser()
  if (!activeUser) return <div>retrieving the active user pubkey ...</div>
  return (
    <>
      <Profile activeUserPubkey={activeUser.pubkey} />
    </>
  )
}

export default RetrieveActiveUser
