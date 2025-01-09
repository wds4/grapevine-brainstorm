import React, { useEffect, useState } from 'react'
import { useActiveUser, useNdk } from 'nostr-hooks'
import ProfilesTable from 'src/views/graperank/components/profilesTable'
import { useSearchParams } from 'react-router-dom'
import { nip19 } from 'nostr-tools'
import { asyncFetchProfile } from 'src/helpers/ndk'

const FollowRecommendationsForYou = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [followRecommendationsForYou, setFollowRecommendationsForYou] = useState([])
  const [profile, setProfile] = useState({})
  const { activeUser } = useActiveUser()
  const { ndk } = useNdk()

  const myPubkey = searchParams.get('myPubkey')

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

  const url = `https://www.graperank.tech/api/neo4j/getFollowRecommendations?recommender=${myPubkey}&recommendee=${pubkeyFromUrl}`
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
        setExists('getFollows endpoint failed')
      }
      if (data.success) {
        setFollowRecommendationsForYou(data.data.aFollowRecommendations)
      }
      return data
    } catch (error) {
      console.error('getFollows endpoint error:', error)
    }
  }
  useEffect(() => {
    fetchData(url)
  }, [])

  const tableConfig = {
    show: 'aPubkeys', // 'all' or 'aPubkeys'; if aPubkeys, limit table to pubkeys in aPubkeys
    aPubkeys: followRecommendationsForYou,
    displayDosTable: 'none', // none, block
    displayPublishButton: 'none', // none, block
  }
  if (!activeUser) return <div>retrieving the active user pubkey ...</div>
  if (followRecommendationsForYou.length == 0) return <div>fetching follows ... </div>
  return (
    <>
      <center>
        <h4>
          {profile?.displayName} <span style={{ color: 'grey' }}>@{profile?.name}</span>: Follow Recommendations By You
        </h4>
        <p>
          (profiles that you recommend to {profile?.displayName}{' '}
          <span style={{ color: 'grey' }}>@{profile?.name}</span>)
        </p>
      </center>
      <ProfilesTable pubkey={activeUser.pubkey} tableConfig={tableConfig} />
    </>
  )
}

export default FollowRecommendationsForYou
