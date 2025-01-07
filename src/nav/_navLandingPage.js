import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilApps, cilChart, cilChartLine, cilGlobeAlt, cilGraph, cilHome, cilInfo, cilListFilter, cilPeople, cilSitemap } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'My Webs of Trust',
  },
  {
    component: CNavItem,
    name: 'Table',
    to: '/profiles',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Scattercharts',
    icon: <CIcon icon={cilListFilter} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'GrapeRank v PageRank',
        icon: <CIcon icon={cilChartLine} customClassName="nav-icon" />,
        to: '/scattercharts/pr_v_gr',
      },
      {
        component: CNavItem,
        name: 'DoS vs GrapeRank',
        icon: <CIcon icon={cilChartLine} customClassName="nav-icon" />,
        to: '/scattercharts/dos_v_gr',
      },
      {
        component: CNavItem,
        name: 'DoS vs PageRank',
        icon: <CIcon icon={cilChartLine} customClassName="nav-icon" />,
        to: '/scattercharts/dos_v_pr',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'hopstr',
  },
  {
    component: CNavItem,
    name: 'Follows Network',
    to: '/hopstr/followsNetwork',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'About',
  },
  {
    component: CNavItem,
    name: 'GrapeRank',
    to: '/about/graperank',
    icon: <CIcon icon={cilInfo} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'PageRank',
    to: '/about/pagerank',
    icon: <CIcon icon={cilInfo} customClassName="nav-icon" />,
  },
]

export default _nav

/*
  {
    component: CNavItem,
    name: 'GrapeRank',
    to: '/about/graperank',
    icon: <CIcon icon={cilInfo} customClassName="nav-icon" />,
  },
  */

/*
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
        name: 'GrapeRank',
        to: '/graperank',
      },
      {
        component: CNavItem,
        name: 'Hopstr',
        to: '/hopstr',
      },
    ],
  },
*/
