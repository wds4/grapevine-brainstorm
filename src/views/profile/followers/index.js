import React, { useEffect, useState } from 'react'
import { useActiveUser, useNdk } from 'nostr-hooks'
import ProfilesTable from 'src/views/graperank/components/profilesTable'
import { useSearchParams } from 'react-router-dom'
import { nip19 } from 'nostr-tools'
import { asyncFetchProfile } from 'src/helpers/ndk'

const Followers = () => {
  console.log(`=== rerender Followers`)
  const [searchParams, setSearchParams] = useSearchParams()
  const [followers, setFollowers] = useState([])

  const [profile, setProfile] = useState({})
  const { activeUser } = useActiveUser()
  const { ndk } = useNdk()

  let pubkeyFromUrl = searchParams.get('pubkey')
  const npubFromUrl = searchParams.get('npub')
  if (npubFromUrl) {
    // setProvidedNpub(npubFromUrl)
    // internalNpub = npubFromUrl
    const pk = nip19.decode(npubFromUrl)
    // console.log(`pk: ${JSON.stringify(pk)}`)
    pubkeyFromUrl = pk.data
  }
  pubkeyFromUrl = pubkeyFromUrl.toLowerCase()

  const processData = (data) => {
    setFollowers(data.data.aPubkeys)
  }

  const url = `https://www.graperank.tech/api/neo4j/getFollowers/singlePubkey?pubkey=${pubkeyFromUrl}`
  async function fetchData(url) {
    console.log(`========== call async function fetchData`)
    const obj = {}
    obj.pubkey = pubkeyFromUrl
    const oProfile = await asyncFetchProfile(ndk, obj)
    setProfile(oProfile)
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      if (!data.success) {
        setExists('getFollowers endpoint failed')
      }
      if (data.success) {
        console.log(`========== call async function fetchData; setFollowers!`)
        processData(data)
      }
      return data
    } catch (error) {
      console.error('getFollowers endpoint error:', error)
    }
  }

  useEffect(() => {
    fetchData(url)
  }, [])

  const tableConfig = {
    show: 'aPubkeys', // 'all' or 'aPubkeys'; if aPubkeys, limit table to pubkeys in aPubkeys
    aPubkeys: followers,
    displayDosTable: 'none', // none, block
    displayPublishButton: 'none', // none, block
  }

  if (!activeUser) return <div>retrieving the active user pubkey ...</div>
  if (followers.length == 0) return <div>fetching followers ... </div>
  return (
    <>
      <center>
        <h4>
          {profile?.displayName} <span style={{ color: 'grey' }}>@{profile?.name}</span>: Followers
        </h4>
      </center>
      <ProfilesTable pubkey={activeUser.pubkey} tableConfig={tableConfig} />
    </>
  )
}

export default Followers
