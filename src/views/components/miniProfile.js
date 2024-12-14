import React from 'react'
import { useNdk } from 'nostr-hooks'
import { CNavLink } from '@coreui/react'
import { asyncFetchProfile } from 'src/helpers/ndk'

export const MiniProfile = ({ pubkey }) => {
  const { ndk } = useNdk()
  const [profile, setProfile] = React.useState({})

  React.useEffect(() => {
    const obj = {}
    obj.pubkey = pubkey
    const updateProfile = async () => {
      const obj = {}
      obj.pubkey = pubkey
      const oProfile = await asyncFetchProfile(ndk, obj)
      setProfile(oProfile)
    }
    updateProfile()
  })
  const profileHref = `#/profile?pubkey=${pubkey}`
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div className="profileAvatarContainerSmall">
        <CNavLink href={profileHref}>
          <img src={profile?.image} className="profileAvatarSmall" />
        </CNavLink>
      </div>{' '}
      <div style={{ display: 'inline-block', marginLeft: '5px' }}>
        <strong>
          {profile?.displayName} <span style={{ color: 'grey' }}>@{profile?.name}</span>
        </strong>
      </div>
    </div>
  )
}

export default MiniProfile
