import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilInfo, cilListFilter, cilPen, cilSpeedometer } from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Hopstr',
    to: '/app3',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Features',
  },
  {
    component: CNavItem,
    name: 'Shortest Path',
    to: '/app3/shortestPath',
    icon: <CIcon icon={cilListFilter} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Feature B',
    to: '/app3/featureB',
    icon: <CIcon icon={cilPen} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'About',
  },
  {
    component: CNavItem,
    name: 'About',
    to: '/app3/about',
    icon: <CIcon icon={cilInfo} customClassName="nav-icon" />,
  },
]

export default _nav
