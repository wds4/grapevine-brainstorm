import React, { useEffect, useState } from 'react'
import { useActiveUser, useNdk } from 'nostr-hooks'
import ProfilesTable from 'src/views/graperank/components/profilesTable'
import { useSearchParams } from 'react-router-dom'
import { nip19 } from 'nostr-tools'
import { asyncFetchProfile } from 'src/helpers/ndk'

const Idols = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [idols, setIdols] = useState([])
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
  if (pubkeyFromUrl) {
    pubkeyFromUrl = pubkeyFromUrl.toLowerCase()
  }

  const url = `https://www.graperank.tech/api/neo4j/getFollowersFollowsMutualsFansIdols/singlePubkey?pubkey=${pubkeyFromUrl}`
  async function fetchData(url) {
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
        setExists('getFollowersFollowsMutualsFansIdols endpoint failed')
      }
      if (data.success) {
        setIdols(data.data.aIdols)
      }
      return data
    } catch (error) {
      console.error('getFollowersFollowsMutualsFansIdols endpoint error:', error)
    }
  }
  useEffect(() => {
    fetchData(url)
  }, [])

  const tableConfig = {
    show: 'aPubkeys', // 'all' or 'aPubkeys'; if aPubkeys, limit table to pubkeys in aPubkeys
    aPubkeys: idols,
    displayDosTable: 'none', // none, block
    displayPublishButton: 'none', // none, block
  }
  if (!activeUser) return <div>retrieving the active user pubkey ...</div>
  if (idols.length == 0) return <div>fetching idols ... </div>
  return (
    <>
      <center>
        <h4>
          {profile?.displayName} <span style={{ color: 'grey' }}>@{profile?.name}</span>: Idols
        </h4>
        <p>
          (profiles that are followed by but do NOT follow {profile?.displayName}{' '}
          <span style={{ color: 'grey' }}>@{profile?.name}</span>)
        </p>
      </center>
      <ProfilesTable pubkey={activeUser.pubkey} tableConfig={tableConfig} />
    </>
  )
}

export default Idols