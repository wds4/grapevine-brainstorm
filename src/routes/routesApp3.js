import React from 'react'

// Dashboard
const App3 = React.lazy(() => import('src/views/hopstr/index'))

// About
const About = React.lazy(() => import('src/views/hopstr/about/index'))

// Features
const ShortestPath = React.lazy(() => import('src/views/hopstr/shortestPath/index'))
const FollowsNetwork = React.lazy(() => import('src/views/hopstr/followsNetwork/index'))

const routes = [
  { path: '/hopstr', name: 'Hopstr', element: App3 },
  { path: '/hopstr/about', name: 'About', element: About },
  { path: '/hopstr/shortestPath', name: 'Shortest Path', element: ShortestPath },
  { path: '/hopstr/followsNetwork', name: 'Follows Network', element: FollowsNetwork },
]

export default routes
