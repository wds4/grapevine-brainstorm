import { useActiveUser, useNdk } from 'nostr-hooks'
import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CContainer, CCardTitle, CRow, CCol } from '@coreui/react'
import { useSearchParams } from 'react-router-dom'
import { asyncFetchProfile } from 'src/helpers/ndk'
import ShowScoreCalculations_brainstorm from './showScoreCalculations_brainstorm'
import ShowScoreCalculations_gvEarth from './showScoreCalculations_gvRogue'
import { nip19 } from 'nostr-tools'
import { noProfilePicUrl } from 'src/const'

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
          <CCol xs={2}>
            <div className="profileAvatarContainer">
              <img src={profile?.image} className="profileAvatarLarge" />
            </div>
          </CCol>
          <CCol xs={8}>
            <center>
              <CCardTitle>{profile?.displayName}</CCardTitle>
            </center>
            <br />
            <div>{profile?.name}</div>
            <div>{providedPubkey}</div>
            <div>{calculatedNpub}</div>
            <div>DoS: {dos}</div>
            <div>average: {average}</div>
            <div>influence: {influence}</div>
            <div>confidence: {confidence * 100} %</div>
            <div>input: {input}</div>
          </CCol>
        </CRow>
      </CContainer>

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
