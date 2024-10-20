import React from 'react'

// Dashboard
const LandingPage = React.lazy(() => import('src/views/grapevine/landingPage/index'))

// About
const About = React.lazy(() => import('src/views/grapevine/about/index'))

// Features
const Interpretation = React.lazy(() => import('src/views/grapevine/interpretation/index'))
const FeatureA = React.lazy(() => import('src/views/grapevine/view/index'))
const FeatureB = React.lazy(() => import('src/views/grapevine/update/index'))
const ProfilesTable = React.lazy(() => import('src/views/grapevine/profilesTable/index'))
const ProfilesTableCloud = React.lazy(() => import('src/views/grapevine/profilesTable_cloud/index'))

const routes = [
  { path: '/grapevine', name: 'Grapevine', element: LandingPage },
  { path: '/grapevine/about', name: 'About', element: About },
  { path: '/grapevine/interpretation', name: 'Interpretation', element: Interpretation },
  { path: '/grapevine/view', name: 'View your Grapevine', element: FeatureA },
  { path: '/grapevine/update', name: 'Update your Grapevine', element: FeatureB },
  { path: '/grapevine/profilesTable', name: 'Profiles Table', element: ProfilesTable },
  {
    path: '/grapevine/profilesTable_cloud',
    name: 'Profiles Table (cloud)',
    element: ProfilesTableCloud,
  },
]

export default routes
