import React from 'react'
import CIcon from '@coreui/icons-react'
import { cibTwitter, cibWikipedia, cilApps, cilInfo, cilSpeedometer, cilUser } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'Brainstorm',
  },
  {
    component: CNavItem,
    name: 'Landing Page',
    to: '/landingPage',
    icon: <CIcon icon={cilInfo} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'My Web of Trust',
    to: '/profiles',
    icon: <CIcon icon={cilInfo} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Under Development',
  },
  {
    component: CNavItem,
    name: 'Apps',
    to: '/dashboard',
    icon: <CIcon icon={cilInfo} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'About',
  },
  {
    component: CNavItem,
    name: 'About PGFT',
    to: '/about',
    icon: <CIcon icon={cilInfo} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Apps',
  },
  {
    component: CNavGroup,
    name: 'Apps',
    icon: <CIcon icon={cilApps} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Grapevine',
        to: '/grapevine',
      },
      {
        component: CNavItem,
        name: 'GrapeRank',
        to: '/graperank',
      },
      {
        component: CNavItem,
        name: 'App 3',
        to: '/app3',
      },
    ],
  },
]

export default _nav
