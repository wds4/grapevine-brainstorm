import React from 'react'

// const LandingPage = React.lazy(() => import('src/views/landingPage/index'))
const LandingPage = React.lazy(() => import('src/views/graperank/landingPage'))
const Dashboard = React.lazy(() => import('src/views/dashboard/index'))

// About
const About = React.lazy(() => import('src/views/about/index'))
const AboutGrapeRank = React.lazy(() => import('src/views/about/graperank/index'))
const AboutPageRank = React.lazy(() => import('src/views/about/pagerank/index'))

// Profiles
// const Profiles = React.lazy(() => import('src/views/profiles/index'))
const Profiles = React.lazy(() => import('src/views/graperank/profiles'))

const Scatterplot_pr_v_gr = React.lazy(() => import('src/views/graperank/scattercharts/pr_v_gr'))
const Scatterplot_dos_v_gr = React.lazy(() => import('src/views/graperank/scattercharts/dos_v_gr'))
const Scatterplot_dos_v_pr = React.lazy(() => import('src/views/graperank/scattercharts/dos_v_pr'))

// Worldviews
const Worldviews = React.lazy(() => import('src/views/worldviews/index'))

const routes = [
  { path: '/landingPage', name: 'Landing Page', element: LandingPage },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },

  { path: '/about', name: 'About', element: About },
  { path: '/about/graperank', name: 'GrapeRank', element: AboutGrapeRank },
  { path: '/about/pagerank', name: 'PageRank', element: AboutPageRank },

  { path: '/scattercharts/pr_v_gr', name: 'PR v GR', element: Scatterplot_pr_v_gr },
  { path: '/scattercharts/dos_v_pr', name: 'DoS v PR', element: Scatterplot_dos_v_pr },
  { path: '/scattercharts/dos_v_gr', name: 'DoS v GR', element: Scatterplot_dos_v_gr },

  { path: '/profiles', name: 'Profiles', element: Profiles },
  { path: '/worldviews', name: 'Worldviews', element: Worldviews },
]

export default routes
