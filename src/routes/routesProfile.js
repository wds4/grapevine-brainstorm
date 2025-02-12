import React from 'react'

// Dashboard
const Profile = React.lazy(() => import('src/views/profile/index'))

// About
const About = React.lazy(() => import('src/views/profile/about/index'))
const Follows = React.lazy(() => import('src/views/profile/follows/index'))
const Followers = React.lazy(() => import('src/views/profile/followers/index'))
const Mutuals = React.lazy(() => import('src/views/profile/mutuals/index'))
const Fans = React.lazy(() => import('src/views/profile/fans/index'))
const Idols = React.lazy(() => import('src/views/profile/idols/index'))
const Muters = React.lazy(() => import('src/views/profile/muters'))
const Mutes = React.lazy(() => import('src/views/profile/mutes'))

const FollowRecsForYou = React.lazy(() => import('src/views/profile/followRecsForYou'))
const FollowRecsByYou = React.lazy(() => import('src/views/profile/followRecsByYou'))

const ShortestPath = React.lazy(() => import('src/views/profile/shortestPath'))
const Scores = React.lazy(() => import('src/views/profile/scores/index'))
const GrapeRankScoreCalculations = React.lazy(
  () => import('src/views/profile/grapeRankScoreCalculations/index'),
)

const routes = [
  { path: '/profile', name: 'Profile', element: Profile },
  { path: '/profile/about', name: 'About', element: About },
  { path: '/profile/follows', name: 'Follows', element: Follows },
  { path: '/profile/followers', name: 'Followers', element: Followers },
  { path: '/profile/mutuals', name: 'Mutuals', element: Mutuals },
  { path: '/profile/fans', name: 'Fans', element: Fans },
  { path: '/profile/idols', name: 'Idols', element: Idols },

  { path: '/profile/muters', name: 'Muters', element: Muters },
  { path: '/profile/mutes', name: 'Mutes', element: Mutes },

  { path: '/profile/followRecsForYou', name: 'Follow Recs for You', element: FollowRecsForYou },
  { path: '/profile/followRecsByYou', name: 'Follow Recs by You', element: FollowRecsByYou },

  { path: '/profile/shortestPath', name: 'ShortestPath', element: ShortestPath },
  { path: '/profile/scores', name: 'Scores', element: Scores },
  {
    path: '/profile/grapeRankScoreCalculations',
    name: 'GrapeRank Score Calculations',
    element: GrapeRankScoreCalculations,
  },
]

export default routes
