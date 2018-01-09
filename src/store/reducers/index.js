import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import auth from './auth'
import serverConstants from './server-constants'
// import entity from "./entity";
// import eventForEdit from "./event-for-edit";
// import eventSeriesForEdit from "./eventseries-for-edit";
import modal from './modal'
import search from './search'
// import tag from "./tag";
// import talentForEdit from "./talent-for-edit";
// import venueForEdit from "./venue-for-edit";
// import eventMonitors from "./event-monitors";
import notifications from './notifications'
// import eventMonitorForEdit from "./event-monitor-for-edit";
// import venueMonitorForEdit from "./venue-monitor-for-edit";
import browser from './browser'
import status from './status'
// import { FullEvent } from "_src/entities/event";
// import { FullEventSeries } from "_src/entities/event-series";
// import { FullTalent } from "_src/entities/talent";
// import { FullVenue } from "_src/entities/venue";
// import {
//   ENTITY_TYPE_EVENT,
//   ENTITY_TYPE_EVENT_SERIES,
//   ENTITY_TYPE_TALENT,
//   ENTITY_TYPE_VENUE
// } from "_src/constants/entity";

export default combineReducers({
  form: formReducer,
  auth,
  modal,
  serverConstants,
  search,
  // tag,
  notifications,
  status,
  // eventMonitors,
  // eventMonitorForEdit,
  // venueMonitorForEdit,
  // event: entity(ENTITY_TYPE_EVENT, FullEvent),
  // eventSeries: entity(ENTITY_TYPE_EVENT_SERIES, FullEventSeries),
  // talent: entity(ENTITY_TYPE_TALENT, FullTalent),
  // venue: entity(ENTITY_TYPE_VENUE, FullVenue),
  // eventForEdit,
  // eventSeriesForEdit,
  // talentForEdit,
  // venueForEdit,
  browser
})
