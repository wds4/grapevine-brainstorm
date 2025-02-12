import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilBuilding, cilClipboard, cilGraph, cilSpeedometer } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Hello World',
    to: '/helloWorld',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'nostr-hooks',
  },
  {
    component: CNavItem,
    name: '1: Subscribe to Events',
    to: '/helloWorld/testPage1',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: '2: Active User Profile',
    to: '/helloWorld/testPage2',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: '3: Fetch profile',
    to: '/helloWorld/testPage3',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: '4: NDK Instance',
    to: '/helloWorld/testPage4',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: '5: Publish New Event',
    to: '/helloWorld/testPage5',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'misc',
  },
  {
    component: CNavItem,
    name: '6: cURL to interp engine',
    to: '/helloWorld/testPage6',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: '7: verifyPubkeyValidity',
    to: '/helloWorld/testPage7',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: '8: cURL to calc engine',
    to: '/helloWorld/testPage8',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: '9: cURL show current R',
    to: '/helloWorld/testPage9',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: '10: cURL update R',
    to: '/helloWorld/testPage10',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: '11: confetti',
    to: '/helloWorld/testPage11',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: '12: Tanstack Table',
    to: '/helloWorld/testPage12',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: '13: vis.js',
    to: '/helloWorld/testPage13',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'unused',
  },

  {
    component: CNavItem,
    name: 'Test Page 14',
    to: '/helloWorld/testPage14',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Test Page 15',
    to: '/helloWorld/testPage15',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Test Page 16',
    to: '/helloWorld/testPage16',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Test Page 17',
    to: '/helloWorld/testPage17',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Test Page 18',
    to: '/helloWorld/testPage18',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Test Page 19',
    to: '/helloWorld/testPage19',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Test Page 20',
    to: '/helloWorld/testPage20',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
  },
]

export default _nav
