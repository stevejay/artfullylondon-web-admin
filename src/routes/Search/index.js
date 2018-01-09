import _ from 'lodash'
import { hasQuery } from '_src/lib/routing'
import { SEARCH_TYPE_BASIC } from '_src/constants/search'
import { basicSearchPageEntered, search } from '_src/actions/search'
import { handleEnterRestrictedRoute } from '_src/lib/auth'
import BasicSearch from '_src/containers/Pages/BasicSearch'
import store from '_src/store'

module.exports = {
  onEnter: handleEnterRoot,
  childRoutes: [
    {
      path: 'search',
      component: BasicSearch,
      onEnter: handleEnterSearch(),
      onChange: (_, nextState) =>
        handleChangeSearch(nextState, SEARCH_TYPE_BASIC)
    }
  ]
}

function handleEnterRoot (nextState, replace, callback) {
  handleEnterRestrictedRoute(nextState, replace)
    .then(() => callback())
    .catch(err => callback(err))
}

function handleEnterSearch () {
  function action (nextState) {
    store.dispatch(basicSearchPageEntered())
    dispatchSearch(nextState.location, SEARCH_TYPE_BASIC)
  }

  // temporary fix for https://github.com/reactjs/react-router-redux/issues/481
  return _.debounce(action, 10)
}

function handleChangeSearch (nextState, searchType) {
  dispatchSearch(nextState.location, searchType)
}

function dispatchSearch (location, searchType) {
  if (hasQuery(location)) {
    store.dispatch(
      search({
        searchType,
        query: location.query
      })
    )
  }
}
