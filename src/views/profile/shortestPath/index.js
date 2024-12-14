import React, { useEffect, useState } from 'react'
import { useActiveUser, useNdk } from 'nostr-hooks'
import { useSearchParams } from 'react-router-dom'
import { nip19 } from 'nostr-tools'
import { asyncFetchProfile } from 'src/helpers/ndk'
import MiniProfile from '../../components/miniProfile'

const GetShortestPath = ({ activeUserPubkey, pubkeyFromUrl }) => {
  const [aPubkeys, setAPubkeys] = useState([])
  const [profile, setProfile] = useState({})
  const { activeUser } = useActiveUser()
  const { ndk } = useNdk()

  const url = `https://www.graperank.tech/api/neo4j/getShortestPath?pubkey1=${activeUserPubkey}&pubkey2=${pubkeyFromUrl}`
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
      // console.log(data.data)
      if (!data.success) {
        setExists('getFollows endpoint failed')
      }
      if (data.success) {
        setAPubkeys(data.data.aPubkeys)
      }
      return data
    } catch (error) {
      console.error('getFollows endpoint error:', error)
    }
  }
  useEffect(() => {
    fetchData(url)
  })

  if (!activeUser) return <div>retrieving the active user pubkey ...</div>
  if (!aPubkeys) return <div>fetching the path of pubkeys ... </div>
  // console.log(`rerender shortestPath`)
  return (
    <>
      <center>
        <h4>
          Shortest Path to {profile?.displayName}{' '}
          <span style={{ color: 'grey' }}>@{profile?.name}</span>
        </h4>
      </center>
      <div style={{ marginleft: '20px' }}>
        {aPubkeys.map((pk, item) => {
          return (
            <>
              <div>hop # {item}:</div>
              <div style={{ marginLeft: '100px' }}>
                <MiniProfile pubkey={pk} />
              </div>
            </>
          )
        })}
      </div>
    </>
  )
}

const GetShortestPath_RetrieveActiveUser = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  let pubkeyFromUrl = searchParams.get('pubkey')
  const npubFromUrl = searchParams.get('npub')
  if (npubFromUrl) {
    const pk = nip19.decode(npubFromUrl)
    pubkeyFromUrl = pk.data
  }
  pubkeyFromUrl = pubkeyFromUrl.toLowerCase()

  const { activeUser } = useActiveUser()

  if (!activeUser) return <div>retrieving the active user pubkey ...</div>
  if (!pubkeyFromUrl) return <div>retrieving pubkeyFromUrl ...</div>
  return (
    <>
      <GetShortestPath activeUserPubkey={activeUser.pubkey} pubkeyFromUrl={pubkeyFromUrl} />
    </>
  )
}

export default GetShortestPath_RetrieveActiveUser
