import React from 'react'
import { useActiveUser } from 'nostr-hooks'

const UpdateDashboard = ({ pubkey }) => {
  return (
    <>
      <center>
        <h3>Update your Grapevine and DoS WoT Networks</h3>
      </center>
      <div>
        <p>your pubkey: {pubkey}</p>
      </div>
    </>
  )
}

const RetrieveActiveUser = () => {
  const { activeUser } = useActiveUser()
  if (!activeUser) return <div>retrieving the active user pubkey ...</div>
  return <UpdateDashboard pubkey={activeUser.pubkey} />
}

export default RetrieveActiveUser
