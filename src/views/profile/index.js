import { useActiveUser, useNdk } from 'nostr-hooks'
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { asyncFetchProfile } from 'src/helpers/ndk'
import ShowScoreCalculations from './showScoreCalculations'

const Profile = ({ activeUserPubkey }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [providedNpub, setProvidedNpub] = useState('')
  const [providedPubkey, setProvidedPubkey] = useState('')
  const [profile, setProfile] = useState({})

  const { ndk } = useNdk()

  useEffect(() => {
    let internalNpub = ''
    let internaPubkey = ''
    function updateUserDataFromUrl() {
      const npubFromUrl = searchParams.get('npub')
      if (npubFromUrl) {
        setProvidedNpub(npubFromUrl)
        internalNpub = npubFromUrl
      }
      const pubkeyFromUrl = searchParams.get('pubkey')
      if (pubkeyFromUrl) {
        setProvidedPubkey(pubkeyFromUrl)
        internaPubkey = pubkeyFromUrl
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
      if (internaPubkey) {
        const obj = {}
        obj.pubkey = internaPubkey
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
    return <div>profile with pubkey: {providedPubkey} not found</div>
  }
  return (
    <>
      <center>
        <h3>Profile</h3>
      </center>
      <p>Observer (logged-in user): {activeUserPubkey}</p>
      <p>Observee: {providedPubkey}</p>
      <ShowScoreCalculations activeUserPubkey={activeUserPubkey} pubkey={providedPubkey} />
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
