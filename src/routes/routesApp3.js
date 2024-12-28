import React from 'react'

// Dashboard
const App3 = React.lazy(() => import('src/views/hopstr/index'))

// About
const About = React.lazy(() => import('src/views/hopstr/about/index'))

// Features
const FeatureA = React.lazy(() => import('src/views/hopstr/shortestPath/index'))
const FeatureB = React.lazy(() => import('src/views/hopstr/featureB/index'))

const routes = [
  { path: '/hopstr', name: 'Hopstr', element: App3 },
  { path: '/hopstr/about', name: 'About', element: About },
  { path: '/hopstr/shortestPath', name: 'Shortest Path', element: FeatureA },
  { path: '/hopstr/featureB', name: 'Feature B', element: FeatureB },
]

export default routes
