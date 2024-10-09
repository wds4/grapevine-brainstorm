import React from 'react'

// Dashboard
const App1 = React.lazy(() => import('src/views/grapevine/index'))

// About
const About = React.lazy(() => import('src/views/grapevine/about/index'))

// Features
const Interpretation = React.lazy(() => import('src/views/grapevine/interpretation/index'))
const FeatureA = React.lazy(() => import('src/views/grapevine/view/index'))
const FeatureB = React.lazy(() => import('src/views/grapevine/update/index'))

const routes = [
  { path: '/grapevine', name: 'App 1', element: App1 },
  { path: '/grapevine/about', name: 'About', element: About },
  { path: '/grapevine/interpretation', name: 'Interpretation', element: Interpretation },
  { path: '/grapevine/view', name: 'View your Grapevine', element: FeatureA },
  { path: '/grapevine/update', name: 'Update your Grapevine', element: FeatureB },
]

export default routes
