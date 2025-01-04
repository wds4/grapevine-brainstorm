import React from 'react'
import { useActiveUser } from 'nostr-hooks'
// import ProfilesTable from '../components/profilesTable'
import ProfilesTable from 'src/views/graperank/components/profilesTable'

const RetrieveActiveUser = () => {
  const { activeUser } = useActiveUser()
  const tableConfig = {
    show: 'all', // 'all' or 'aPubkeys'; if aPubkeys, limit table to pubkeys in aPubkeys
    aPubkeys: [],
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
