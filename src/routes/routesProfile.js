import React from 'react'

// Dashboard
const Profile = React.lazy(() => import('src/views/profile/index'))

// About
const About = React.lazy(() => import('src/views/profile/about/index'))
const Follows = React.lazy(() => import('src/views/profile/follows/index'))
const Followers = React.lazy(() => import('src/views/profile/followers/index'))
const Muters = React.lazy(() => import('src/views/profile/muters'))
const ShortestPath = React.lazy(() => import('src/views/profile/shortestPath'))
const Scores = React.lazy(() => import('src/views/profile/scores/index'))

const routes = [
  { path: '/profile', name: 'Profile', element: Profile },
  { path: '/profile/about', name: 'About', element: About },
  { path: '/profile/follows', name: 'Follows', element: Follows },
  { path: '/profile/followers', name: 'Followers', element: Followers },
  { path: '/profile/muters', name: 'Muters', element: Muters },
  { path: '/profile/shortestPath', name: 'ShortestPath', element: ShortestPath },
  { path: '/profile/scores', name: 'Scores', element: Scores },
]

export default routes
