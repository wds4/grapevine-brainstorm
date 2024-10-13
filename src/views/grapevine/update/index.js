import React from 'react'
import { useActiveUser } from 'nostr-hooks'
import UpdateMyFollowsAndMutes from './updateMyFollowsAndMutes'
import UsersTableStats from './usersTableStats'
import TransferMyFollowsAndMutes from './transferMyFollowsAndMutes'
import CreateMyObserverObject from './createMyObserverObject'

const UpdateDashboard = ({ pubkey }) => {
  return (
    <>
      <center>
        <h3>Update your Grapevine and DoS WoT Networks</h3>
      </center>
      <UpdateMyFollowsAndMutes pubkey={pubkey} />
      <TransferMyFollowsAndMutes pubkey={pubkey} />
      <CreateMyObserverObject pubkey={pubkey} />
      <UsersTableStats pubkey={pubkey} />
    </>
  )
}

const RetrieveActiveUser = () => {
  const { activeUser } = useActiveUser()
  if (!activeUser) return <div>retrieving the active user pubkey ...</div>
  return <UpdateDashboard pubkey={activeUser.pubkey} />
}

export default RetrieveActiveUser
