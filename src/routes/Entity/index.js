import _ from 'lodash'
import {
  ENTITY_TYPE_EVENT,
  ENTITY_TYPE_EVENT_SERIES,
  ENTITY_TYPE_TALENT,
  ENTITY_TYPE_VENUE
} from '_src/constants/entity'
import EditEvent from '_src/containers/Pages/EditEvent'
import ViewEvent from '_src/containers/Pages/ViewEvent'
import EditEventSeries from '_src/containers/Pages/EditEventSeries'
import ViewEventSeries from '_src/containers/Pages/ViewEventSeries'
import EditTalent from '_src/containers/Pages/EditTalent'
import ViewTalent from '_src/containers/Pages/ViewTalent'
import EditVenue from '_src/containers/Pages/EditVenue'
import ViewVenue from '_src/containers/Pages/ViewVenue'
// import ViewVenueEventMonitors from '_src/containers/Pages/ViewVenueEventMonitors';
import store from '_src/store'
import {
  getEntity,
  getEntityForEdit,
  resetEntityForEdit
} from '_src/actions/entity'
// import { getVenueEventMonitors } from "_src/actions/monitors";
import { handleEnterRestrictedRoute } from '_src/lib/auth'

module.exports = {
  onEnter: handleEnterRoot,
  childRoutes: [
    {
      path: 'event',
      component: EditEvent,
      onEnter: handleEnterNewEntity(ENTITY_TYPE_EVENT)
    },
    {
      path: 'event/edit/*',
      component: EditEvent,
      onEnter: handleEnterEditEntity(ENTITY_TYPE_EVENT)
    },
    {
      path: 'event/*',
      component: ViewEvent,
      onEnter: handleEnterViewEntity(ENTITY_TYPE_EVENT)
    },
    {
      path: 'event-series',
      component: EditEventSeries,
      onEnter: handleEnterNewEntity(ENTITY_TYPE_EVENT_SERIES)
    },
    {
      path: 'event-series/edit/*',
      component: EditEventSeries,
      onEnter: handleEnterEditEntity(ENTITY_TYPE_EVENT_SERIES)
    },
    {
      path: 'event-series/*',
      component: ViewEventSeries,
      onEnter: handleEnterViewEntity(ENTITY_TYPE_EVENT_SERIES)
    },
    {
      path: 'talent',
      component: EditTalent,
      onEnter: handleEnterNewEntity(ENTITY_TYPE_TALENT)
    },
    {
      path: 'talent/edit/*',
      component: EditTalent,
      onEnter: handleEnterEditEntity(ENTITY_TYPE_TALENT)
    },
    {
      path: 'talent/*',
      component: ViewTalent,
      onEnter: handleEnterViewEntity(ENTITY_TYPE_TALENT)
    },
    {
      path: 'venue',
      component: EditVenue,
      onEnter: handleEnterNewEntity(ENTITY_TYPE_VENUE)
    },
    {
      path: 'venue/edit/*',
      component: EditVenue,
      onEnter: handleEnterEditEntity(ENTITY_TYPE_VENUE)
    },
    // {
    //     path: 'venue/monitors/*',
    //     component: ViewVenueEventMonitors,
    //     onEnter: handleEnterViewVenueEventMonitors
    // },
    {
      path: 'venue/*',
      component: ViewVenue,
      onEnter: handleEnterViewEntity(ENTITY_TYPE_VENUE)
    }
  ]
}

function handleEnterRoot (nextState, replace, callback) {
  handleEnterRestrictedRoute(nextState, replace)
    .then(() => callback())
    .catch(err => callback(err))
}

function handleEnterViewEntity (entityType) {
  function action (nextState) {
    const id = (nextState.params.splat || '').toLowerCase()
    store.dispatch(getEntity({ entityType, id }))
  }

  // temporary fix for https://github.com/reactjs/react-router-redux/issues/481
  return _.debounce(action, 10)
}

function handleEnterEditEntity (entityType) {
  function action (nextState) {
    const id = (nextState.params.splat || '').toLowerCase()
    store.dispatch(getEntityForEdit({ entityType, id }))
  }

  // temporary fix for https://github.com/reactjs/react-router-redux/issues/481
  return _.debounce(action, 10)
}

function handleEnterNewEntity (entityType) {
  function action () {
    store.dispatch(resetEntityForEdit({ entityType }))
  }

  // temporary fix for https://github.com/reactjs/react-router-redux/issues/481
  return _.debounce(action, 10)
}

// function handleEnterViewVenueEventMonitors() {
//     function action(nextState) {
//         const id = (nextState.params.splat || '').toLowerCase();
//         store.dispatch(getVenueEventMonitors({ id }));
//     }

//     // temporary fix for https://github.com/reactjs/react-router-redux/issues/481
//     return _.debounce(action, 1);
// }
