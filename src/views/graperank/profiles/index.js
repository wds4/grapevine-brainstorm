import React from 'react'
import { useActiveUser } from 'nostr-hooks'
import Table from './table'

const RetrieveActiveUser = () => {
  const { activeUser } = useActiveUser()
  if (!activeUser) return <div>retrieving the active user pubkey ...</div>
  return (
    <>
      <Table pubkey={activeUser.pubkey} />
    </>
  )
}

export default RetrieveActiveUser
