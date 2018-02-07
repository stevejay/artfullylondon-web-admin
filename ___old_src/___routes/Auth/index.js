import _ from 'lodash'
import LogIn from '_src/containers/Pages/LogIn'
import LogOut from '_src/containers/Pages/LogOut'
import { handleEnterRestrictedRoute } from '_src/lib/auth'
import { AUTH_STATE_LOGGED_IN } from '_src/constants/auth'
import { logOut, resetLogIn } from '_src/actions/auth'
import store from '_src/store'

module.exports = {
  childRoutes: [
    {
      path: 'log-in',
      component: LogIn,
      onEnter: handleEnterLogIn
    },
    {
      path: 'log-out',
      component: LogOut,
      onEnter: handleEnterLogOut()
    }
  ]
}

function handleEnterLogIn (nextState, replace, cb) {
  handleEnterRestrictedRoute(nextState, replace)
    .then(() => {
      const auth = store.getState().auth

      if (auth.state !== AUTH_STATE_LOGGED_IN) {
        store.dispatch(resetLogIn())
      }
    })
    .then(() => cb())
    .catch(err => cb(err))
}

function handleEnterLogOut () {
  function action () {
    store.dispatch(logOut())
  }

  // temporary fix for https://github.com/reactjs/react-router-redux/issues/481
  return _.debounce(action, 10)
}
