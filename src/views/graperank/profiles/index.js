import React from 'react'
import { useActiveUser } from 'nostr-hooks'
import ProfilesTable from '../components/profilesTable'

const RetrieveActiveUser = () => {
  const { activeUser } = useActiveUser()
  const tableConfig = {
    aPubkeys: [], // array of pubkeys; if empty, show all. Plan to include array of followers or follows
    displayDosTable: 'block', // none, block
    displayPublishButton: 'block', // none, block
  }
  if (!activeUser) return <div>retrieving the active user pubkey ...</div>
  return (
    <>
      <ProfilesTable pubkey={activeUser.pubkey} tableConfig={tableConfig} />
    </>
  )
}

export default RetrieveActiveUser
