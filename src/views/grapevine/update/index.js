import React from 'react'
import { useActiveUser } from 'nostr-hooks'
import UpdateMyFollowsAndMutes from './updateMyFollowsAndMutes'
import TransferMyFollowsAndMutes from './transferMyFollowsAndMutes'
import CreateMyObserverObject from './createMyObserverObject'
import CreateDosSummary from './createDosSummary'

/*
https://interpretation-brainstorm.vercel.app/api/manageData/singleUser/createDosSummary?pubkey=e5272de914bd301755c439b88e6959a43c9d2664831f093c51e9c799a16a102f
then update View your Grapevine page with DoS data
*/

const UpdateDashboard = ({ pubkey }) => {
  return (
    <>
      <center>
        <h3>Update your Grapevine and DoS WoT Networks</h3>
      </center>
      <UpdateMyFollowsAndMutes pubkey={pubkey} />
      <TransferMyFollowsAndMutes pubkey={pubkey} />
      <CreateMyObserverObject pubkey={pubkey} />
      <CreateDosSummary pubkey={pubkey} />
    </>
  )
}

const RetrieveActiveUser = () => {
  const { activeUser } = useActiveUser()
  if (!activeUser) return <div>retrieving the active user pubkey ...</div>
  return <UpdateDashboard pubkey={activeUser.pubkey} />
}

export default RetrieveActiveUser
