import React from 'react'

const LandingPage = React.lazy(() => import('src/views/landingPage/index'))
const Dashboard = React.lazy(() => import('src/views/dashboard/index'))

// About
const About = React.lazy(() => import('src/views/about/index'))

// Profiles
const Profiles = React.lazy(() => import('src/views/profiles/index'))

// Profiles
const Worldviews = React.lazy(() => import('src/views/worldviews/index'))

const routes = [
  { path: '/landingPage', name: 'Landing Page', element: LandingPage },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/about', name: 'About', element: About },

  { path: '/profiles', name: 'Profiles', element: Profiles },
  { path: '/worldviews', name: 'Worldviews', element: Worldviews },
]

export default routes
