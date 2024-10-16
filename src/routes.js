import routesMain from './routes/routesMain'
import routesApps from './routes/routesApps'
import routesProfile from './routes/routesProfile'
import routesHelloWorld from 'src/routes/routesHelloWorld'
import routesSettings from 'src/routes/routesSettings'
import routesGrapevine from 'src/routes/routesGrapevine'
import routesApp2 from 'src/routes/routesApp2'
import routesApp3 from 'src/routes/routesApp3'

const routes = [
  ...routesMain,
  ...routesApps,
  ...routesProfile,
  ...routesHelloWorld,
  ...routesSettings,
  ...routesGrapevine,
  ...routesApp2,
  ...routesApp3,
]

export default routes
