import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useSearchParams } from 'react-router-dom'

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'

// sidebar nav config
import navigationLandingPage from 'src/nav/_navLandingPage'
import navigationDashboard from 'src/nav/_navDashboard'
import navigationHelloWorld from 'src/nav/_navHelloWorld'
import navigationProfile from 'src/nav/_navProfile'
import navigationHSettings from 'src/nav/_navSettings'
import navigationGrapevine from 'src/nav/_navGrapevine'
import navigationGrapeRank from 'src/nav/_navGrapeRank'
import navigationApp3 from 'src/nav/_navApp3'
import { nip19 } from 'nostr-tools'

// const iconSrc = 'src/assets/brand/brainstorm010_white.svg'
// const iconSrc = 'src/assets/brand/brainstorm010_white.svg'
const iconSrc = './brainstorm010_white.svg'

function getNavigation(activeApp) {
  console.log(`getNavigation activeApp: ${activeApp}`)
  switch (activeApp) {
    case 'landingPage':
      return navigationLandingPage
    case 'dashboard':
      return navigationDashboard
    case 'profile':
      return navigationProfile
    case 'helloWorld':
      return navigationHelloWorld
    case 'settings':
      return navigationHSettings
    case 'grapevine':
      return navigationGrapevine
    case 'graperank':
      return navigationGrapeRank
    case 'hopstr':
      return navigationApp3
    default:
      return navigationLandingPage
  }
}

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const currentLocation = useLocation().pathname
  const topLevelLocation = currentLocation.split('/')[1]
  let navigation = getNavigation(topLevelLocation)

  const [searchParams, setSearchParams] = useSearchParams()
  const [providedNpub, setProvidedNpub] = useState('')
  const [calculatedNpub, setCalculatedNpub] = useState('')
  const [providedPubkey, setProvidedPubkey] = useState('')

  useEffect(() => {
    if (topLevelLocation == 'profile') {
      let internalNpub = ''
      let internalPubkey = ''

      let pubkeyFromUrl = searchParams.get('pubkey')
      const npubFromUrl = searchParams.get('npub')
      if (npubFromUrl) {
        setProvidedNpub(npubFromUrl)
        internalNpub = npubFromUrl
        const pk = nip19.decode(npubFromUrl)
        pubkeyFromUrl = pk.data
      }
      if (pubkeyFromUrl) {
        setProvidedPubkey(pubkeyFromUrl)
        internalPubkey = pubkeyFromUrl
        const np = nip19.npubEncode(pubkeyFromUrl)
        setCalculatedNpub(np)
        navigation[0].to = `/profile?pubkey=${internalPubkey}`
        navigation[1].to = `/profile/followers?pubkey=${internalPubkey}`
        navigation[2].to = `/profile/follows?pubkey=${internalPubkey}`
        navigation[3].to = `/profile/muters?pubkey=${internalPubkey}`
        navigation[4].to = `/profile/mutes?pubkey=${internalPubkey}`
        navigation[5].to = `/profile/about?pubkey=${internalPubkey}`
      }
    }
  }, [])

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand href="#/landingPage" to="/" style={{ textDecoration: 'none' }}>
          <img src={iconSrc} style={{ height: '32px', marginLeft: '8px', marginRight: '10px' }} />
          brainSToRm
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
