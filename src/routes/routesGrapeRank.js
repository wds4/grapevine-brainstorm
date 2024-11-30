import React from 'react'

// Dashboard
const GrapeRankHome = React.lazy(() => import('src/views/graperank/landingPage'))

// About
const About = React.lazy(() => import('src/views/graperank/about/index'))

// Features
const FeatureA = React.lazy(() => import('src/views/graperank/featureA/index'))
const FeatureB = React.lazy(() => import('src/views/graperank/featureB/index'))

const routes = [
  { path: '/graperank', name: 'GrapeRank', element: GrapeRankHome },
  { path: '/graperank/about', name: 'About', element: About },
  { path: '/graperank/featureA', name: 'Feature A', element: FeatureA },
  { path: '/graperank/featureB', name: 'Feature B', element: FeatureB },
]

export default routes
