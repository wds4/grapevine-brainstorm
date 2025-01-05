import React, { useMemo } from 'react'
import { useActiveUser, useProfile } from 'nostr-hooks'
import { useSearchParams } from 'react-router-dom'
import { nip19 } from 'nostr-tools'
// import { asyncFetchProfile } from 'src/helpers/ndk'
import MiniProfile from '../../components/miniProfile'

let aPubs = []

async function fetchArrayOfPubkeys({url}) {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    if (data.success) {
      console.log(`fetchArrayOfPubkeys success!`)
      aPubs = data.data.aPubkeys
    }
  } catch (error) {
    console.error('getFollows endpoint error:', error)
  }
}

const GetShortestPath = ({ activeUserPubkey, targetPubkey, targetProfile }) => {
  const url = `https://www.graperank.tech/api/neo4j/getShortestPath?pubkey1=${activeUserPubkey}&pubkey2=${targetPubkey}`

  fetchArrayOfPubkeys({ url })

  console.log(`rerender shortestPath`)
  return (
    <>
      <center>
        <h4>
          Shortest Path to {targetProfile?.displayName}{' '}
          <span style={{ color: 'grey' }}>@{targetProfile?.name}</span>
        </h4>
      </center>
      <div style={{ marginleft: '20px' }}>
        {aPubs.map((pk, item) => {
          return (
            <div key={item}>
              <div>hop # {item}:</div>
              <div style={{ marginLeft: '100px' }}>
                <MiniProfile pubkey={pk} />
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

const GetShortestPath_RetrieveTargetUser = ({ activeUserPubkey, targetPubkey }) => {
  const params = useMemo(() => ({ pubkey: targetPubkey }), [])
  const { profile } = useProfile(params)
  console.log(`rerender GetShortestPath_RetrieveTargetUser;`)
  return (
    <>
      <GetShortestPath
        activeUserPubkey={activeUserPubkey}
        targetPubkey={targetPubkey}
        targetProfile={profile}
      />
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
  if (pubkeyFromUrl) {
    pubkeyFromUrl = pubkeyFromUrl.toLowerCase()
  }
  const { activeUser } = useActiveUser()

  console.log(`rerender GetShortestPath_RetrieveActiveUser`)

  if (!activeUser) return <div>retrieving the active user pubkey ...</div>
  if (!pubkeyFromUrl) return <div>retrieving pubkeyFromUrl ...</div>
  return (
    <>
      <GetShortestPath_RetrieveTargetUser
        activeUserPubkey={activeUser.pubkey}
        targetPubkey={pubkeyFromUrl}
      />
    </>
  )
}

export default GetShortestPath_RetrieveActiveUser
