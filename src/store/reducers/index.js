import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import app from './app'
import auth from './auth'
import serverConstants from './server-constants'
import entity from './entity'
import entityForEdit from './entity-for-edit'
import search from './search'
import tag from './tag'
// import venueForEdit from "./venue-for-edit";
// import eventMonitors from "./event-monitors";
import notification from './notification'
// import eventMonitorForEdit from "./event-monitor-for-edit";
// import venueMonitorForEdit from "./venue-monitor-for-edit";
import browser from './browser'
import status from './status'
import * as entityConstants from '_src/constants/entity'

// TODO try to consolidate entity reducers to single entries.

export default combineReducers({
  form: formReducer,
  app,
  auth,
  serverConstants,
  search,
  tag,
  notification,
  status,
  // eventMonitors,
  // eventMonitorForEdit,
  // venueMonitorForEdit,
  [entityConstants.ENTITY_TYPE_EVENT]: entity(
    entityConstants.ENTITY_TYPE_EVENT
  ),
  [entityConstants.ENTITY_TYPE_EVENT_SERIES]: entity(
    entityConstants.ENTITY_TYPE_EVENT_SERIES
  ),
  [entityConstants.ENTITY_TYPE_TALENT]: entity(
    entityConstants.ENTITY_TYPE_TALENT
  ),
  [entityConstants.ENTITY_TYPE_VENUE]: entity(
    entityConstants.ENTITY_TYPE_VENUE
  ),
  [entityConstants.ENTITY_TYPE_EVENT + '-for-edit']: entityForEdit(
    entityConstants.ENTITY_TYPE_EVENT
  ),
  [entityConstants.ENTITY_TYPE_EVENT_SERIES + '-for-edit']: entityForEdit(
    entityConstants.ENTITY_TYPE_EVENT_SERIES
  ),
  [entityConstants.ENTITY_TYPE_TALENT + '-for-edit']: entityForEdit(
    entityConstants.ENTITY_TYPE_TALENT
  ),
  [entityConstants.ENTITY_TYPE_VENUE + '-for-edit']: entityForEdit(
    entityConstants.ENTITY_TYPE_VENUE
  ),
  browser
})
