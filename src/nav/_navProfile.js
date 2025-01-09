import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilHome, cilInfo, cilListFilter } from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Profile Home',
    to: '/profile',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Followers',
    to: '/profile/followers',
    icon: <CIcon icon={cilListFilter} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Follows',
    to: '/profile/follows',
    icon: <CIcon icon={cilListFilter} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Mutuals',
    to: '/profile/mutuals',
    icon: <CIcon icon={cilListFilter} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Fans',
    to: '/profile/fans',
    icon: <CIcon icon={cilListFilter} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Idols',
    to: '/profile/idols',
    icon: <CIcon icon={cilListFilter} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Follow Recs for You',
    to: '/profile/followRecsForYou',
    icon: <CIcon icon={cilListFilter} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Follow Recs by You',
    to: '/profile/followRecsByYou',
    icon: <CIcon icon={cilListFilter} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Muters',
    to: '/profile/muters',
    icon: <CIcon icon={cilListFilter} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Mutes',
    to: '/profile/mutes',
    icon: <CIcon icon={cilListFilter} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'About',
    to: '/profile/about',
    icon: <CIcon icon={cilInfo} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Grapevine',
  },
  {
    component: CNavItem,
    name: 'Scores',
    to: '/profile/scores',
    icon: <CIcon icon={cilInfo} customClassName="nav-icon" />,
  },
]

export default _nav
