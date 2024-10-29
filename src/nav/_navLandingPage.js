import React from 'react'
import CIcon from '@coreui/icons-react'
import { cibTwitter, cibWikipedia, cilApps, cilBuilding, cilGlobeAlt, cilGraph, cilHome, cilInfo, cilPeople, cilSitemap, cilSpeedometer, cilUser, cilUserPlus } from '@coreui/icons'
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
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'My Web of Trust',
    to: '/profiles',
    icon: <CIcon icon={cilGraph} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Worldviews',
    to: '/worldviews',
    icon: <CIcon icon={cilGlobeAlt} customClassName="nav-icon" />,
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
    name: 'Under Development',
  },
  {
    component: CNavItem,
    name: 'Apps Homepage',
    to: '/dashboard',
    icon: <CIcon icon={cilSitemap} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Apps Menu',
    icon: <CIcon icon={cilApps} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Grapevine',
        to: '/grapevine',
      },
      {
        component: CNavItem,
        name: 'App 2',
        to: '/app2',
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
