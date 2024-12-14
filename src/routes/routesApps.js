import React from 'react'

// const LandingPage = React.lazy(() => import('src/views/landingPage/index'))
const Dashboard = React.lazy(() => import('src/views/dashboard/index'))

// About
const About = React.lazy(() => import('src/views/about/index'))

const routes = [
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/about', name: 'About', element: About },
]

export default routes

// { path: '/landingPage', name: 'Landing Page', element: LandingPage },
