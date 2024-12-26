import React from 'react'

// General Settings
const Settings = React.lazy(() => import('src/views/settings/index'))

// Developer Settings
const Developer = React.lazy(() => import('src/views/settings/developer/index'))

// App Settings
const Grapevine = React.lazy(() => import('src/views/settings/grapevine/index'))
const GrapeRank = React.lazy(() => import('src/views/settings/graperank/index'))
const App3 = React.lazy(() => import('src/views/settings/app3/index'))

const routes = [
  // { path: '/settings', name: 'Settings', element: Settings },
  { path: '/settings', name: 'Settings', element: GrapeRank },
  { path: '/settings/grapevine', name: 'Grapevine', element: Grapevine },
  { path: '/settings/graperank', name: 'GrapeRank', element: GrapeRank },
  { path: '/settings/app3', name: 'App 3', element: App3 },
  { path: '/settings/developer', name: 'Developer', element: Developer },
]

export default routes
