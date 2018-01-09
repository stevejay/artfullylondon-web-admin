import Home from '_src/containers/Pages/Home'
import App from '_src/containers/App'
import { handleEnterRestrictedRoute } from '_src/lib/auth'
import notFound from './NotFound'
import search from './Search'
import misc from './Misc'
import auth from './Auth'
import tags from './Tags'
import entity from './Entity'

export const rootRoute = {
  path: '/',
  indexRoute: {
    component: Home,
    onEnter: handleEnterRoot
  },
  component: App,
  childRoutes: [auth, tags, entity, search, misc, notFound]
}

function handleEnterRoot (nextState, replace, cb) {
  handleEnterRestrictedRoute(nextState, replace)
    .then(() => cb())
    .catch(err => cb(err))
}
