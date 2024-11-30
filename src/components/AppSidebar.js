import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

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

// const iconSrc = 'src/assets/brand/brainstorm010_white.svg'
// const iconSrc = 'src/assets/brand/brainstorm010_white.svg'
const iconSrc = './brainstorm010_white.svg'

function getNavigation(activeApp) {
  console.log(`====== ${activeApp}`)
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
    case 'app3':
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
  const navigation = getNavigation(topLevelLocation)

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
