import React from 'react'

// Dashboard
const GrapeRankHome = React.lazy(() => import('src/views/graperank/landingPage'))

// About
const About = React.lazy(() => import('src/views/graperank/about/index'))

// MyWebsOfTrust
const MyWebsOfTrust = React.lazy(() => import('src/views/graperank/profiles/index'))
const Scatterplot_pr_v_gr = React.lazy(() => import('src/views/graperank/scattercharts/pr_v_gr'))
const Scatterplot_dos_v_gr = React.lazy(() => import('src/views/graperank/scattercharts/dos_v_gr'))
const Scatterplot_dos_v_pr = React.lazy(() => import('src/views/graperank/scattercharts/dos_v_pr'))

// Features
const FeatureA = React.lazy(() => import('src/views/graperank/featureA/index'))
const FeatureB = React.lazy(() => import('src/views/graperank/featureB/index'))

const routes = [
  { path: '/graperank', name: 'GrapeRank', element: GrapeRankHome },
  { path: '/graperank/about', name: 'About', element: About },
  { path: '/graperank/profiles', name: 'My Webs of Trust', element: MyWebsOfTrust },
  { path: '/graperank/scattercharts/pr_v_gr', name: 'PR v GR', element: Scatterplot_pr_v_gr },
  { path: '/graperank/scattercharts/dos_v_pr', name: 'DoS v PR', element: Scatterplot_dos_v_pr },
  { path: '/graperank/scattercharts/dos_v_gr', name: 'DoS v GR', element: Scatterplot_dos_v_gr },
  { path: '/graperank/featureA', name: 'Feature A', element: FeatureA },
  { path: '/graperank/featureB', name: 'Feature B', element: FeatureB },
]

export default routes
