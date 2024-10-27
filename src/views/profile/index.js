import { useActiveUser, useNdk } from 'nostr-hooks'
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { asyncFetchProfile } from 'src/helpers/ndk'
import ShowScoreCalculations_brainstorm from './showScoreCalculations_brainstorm'
import ShowScoreCalculations_gvEarth from './showScoreCalculations_gvRogue'
import { nip19 } from 'nostr-tools'

const Profile = ({ activeUserPubkey }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [providedNpub, setProvidedNpub] = useState('')
  const [calculatedNpub, setCalculatedNpub] = useState('')
  const [providedPubkey, setProvidedPubkey] = useState('')
  const [profile, setProfile] = useState({})

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
    return <div>profile with pubkey: {providedPubkey} and npub: {calculatedNpub} not found</div>
  }
  return (
    <>
      <center>
        <h3>Profile</h3>
      </center>
      <p>Observer (logged-in user): {activeUserPubkey}</p>
      <p>Observee: {providedPubkey}</p>
      <div style={{ border: '1px solid purple', padding: '10px' }}>
        <ShowScoreCalculations_brainstorm activeUserPubkey={activeUserPubkey} pubkey={providedPubkey} />
      </div>
      <div style={{ border: '1px solid purple', padding: '10px' }}>
        <ShowScoreCalculations_gvEarth activeUserPubkey={activeUserPubkey} pubkey={providedPubkey} />
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
