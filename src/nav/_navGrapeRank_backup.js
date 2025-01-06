import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilInfo, cilListFilter, cilPen, cilSpeedometer } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = () => [
  {
    component: CNavItem,
    name: 'GrapeRank Home',
    to: '/graperank',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Features',
  },
  {
    component: CNavItem,
    name: 'My Webs of Trust',
    to: '/graperank/profiles',
    icon: <CIcon icon={cilListFilter} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Scattercharts',
    icon: <CIcon icon={cilListFilter} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'PR v GR',
        to: '/graperank/scattercharts/pr_v_gr',
      },
      {
        component: CNavItem,
        name: 'DoS vs PR',
        to: '/graperank/scattercharts/dos_v_pr',
      },
      {
        component: CNavItem,
        name: 'DoS vs GR',
        to: '/graperank/scattercharts/dos_v_gr',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'About',
  },
  {
    component: CNavItem,
    name: 'About',
    to: '/graperank/about',
    icon: <CIcon icon={cilInfo} customClassName="nav-icon" />,
  },
]

export default _nav
