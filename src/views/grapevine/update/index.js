import React from 'react'
import { useActiveUser } from 'nostr-hooks'
import SingleEndpointControlPanel from './updateMyFollowsAndMutes'

const UpdateDashboard = ({ pubkey }) => {
  return (
    <>
      <center>
        <h3>Update your Grapevine and DoS WoT Networks</h3>
      </center>
      <SingleEndpointControlPanel pubkey={pubkey} />
    </>
  )
}

const RetrieveActiveUser = () => {
  const { activeUser } = useActiveUser()
  if (!activeUser) return <div>retrieving the active user pubkey ...</div>
  return <UpdateDashboard pubkey={activeUser.pubkey} />
}

export default RetrieveActiveUser
