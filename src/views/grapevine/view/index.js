import React from 'react'
import { useActiveUser } from 'nostr-hooks'
import MultiTableStats from './multiTableStats'

const ViewWotDashboard = ({ pubkey }) => {
  return (
    <>
      <center>
        <h3>Overview of the Brainstorm database</h3>
      </center>
      <MultiTableStats pubkey={pubkey} />
    </>
  )
}

const RetrieveActiveUser = () => {
  const { activeUser } = useActiveUser()
  if (!activeUser) return <div>retrieving the active user pubkey ...</div>
  return <ViewWotDashboard pubkey={activeUser.pubkey} />
}

export default RetrieveActiveUser
