import _ from 'lodash'
import store from '_src/store'
import { getTags, getAllTags } from '_src/actions/tag'
import Tags from '_src/containers/Pages/Tags'
import { handleEnterRestrictedRoute } from '_src/lib/auth'
import {
  TAG_TYPE_MEDIUM,
  TAG_TYPE_STYLE,
  TAG_TYPE_GEO,
  TAG_TYPE_AUDIENCE
} from '_src/constants/tag'

module.exports = {
  path: 'tags',
  onEnter: handleEnterRoot,
  onLeave: handleLeaveRoot,
  childRoutes: [
    {
      path: 'medium',
      onEnter: handleEnterTags(TAG_TYPE_MEDIUM),
      component: Tags
    },
    {
      path: 'style',
      onEnter: handleEnterTags(TAG_TYPE_STYLE),
      component: Tags
    },
    {
      path: 'geo',
      onEnter: handleEnterTags(TAG_TYPE_GEO),
      component: Tags
    },
    {
      path: 'audience',
      onEnter: handleEnterTags(TAG_TYPE_AUDIENCE),
      component: Tags
    }
  ]
}

function handleEnterRoot (nextState, replace, callback) {
  handleEnterRestrictedRoute(nextState, replace)
    .then(() => callback())
    .catch(err => callback(err))
}

function handleEnterTags (tagType) {
  function action () {
    store.dispatch(getTags({ tagType }))
  }

  // temporary fix for https://github.com/reactjs/react-router-redux/issues/481
  return _.debounce(action, 10)
}

function handleLeaveRoot () {
  store.dispatch(getAllTags())
}
