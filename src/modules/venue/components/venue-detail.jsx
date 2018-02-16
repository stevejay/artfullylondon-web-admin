import React from 'react'
import PropTypes from 'prop-types'
import LazyLoad from 'react-lazyload'
import { connect } from 'react-redux'

import BasicSection from '_src/components/section/basic'
import {
  EntityDescription,
  EntityDetailsContainer,
  EntityHeading,
  EntityWeSay,
  EntityInfoBar,
  EntityColumnLayout,
  EntityColumn,
  EntityAddress,
  EntityDisabilityAccess,
  OpeningTimes
} from '_src/modules/entity'
import { Image } from '_src/modules/image'
import { ExternalLinks } from '_src/modules/link'
import { EntityPageMap } from '_src/modules/location'
import MonitorCollection from './monitor/collection'
import VenueMonitorGridRow from './monitor/venue-monitor-grid-row'
import EventMonitorGridRow from './monitor/event-monitor-grid-row'
import { selectors as venueSelectors } from '../reducers'
import * as venueActions from '../actions'
import { FullVenue } from '_src/entities/venue'
import * as dateLib from '_src/lib/date'

export class VenueDetail extends React.Component {
  handleVenueMonitorMounted = () => {
    this.props.dispatch(venueActions.getVenueMonitors(this.props.entity.id))
  }
  handleVenueEventMonitorsMounted = () => {
    this.props.dispatch(
      venueActions.getVenueEventMonitors(this.props.entity.id)
    )
  }
  handleSubmitVenueMonitor = values => {
    return this.props.dispatch(venueActions.updateVenueMonitor(values))
  }
  handleSubmitVenueEventMonitor = values => {
    return this.props.dispatch(venueActions.updateVenueEventMonitor(values))
  }
  render () {
    const {
      entity,
      venueMonitors,
      gettingVenueMonitors,
      venueEventMonitors,
      gettingVenueEventMonitors
    } = this.props

    const dateStr = dateLib.getTodayDateAsString()

    return (
      <React.Fragment>
        <Image entityType={entity.entityType} images={entity.images} />
        <EntityHeading>{entity.name}</EntityHeading>
        <EntityDetailsContainer>
          <EntityInfoBar entity={entity} />
          <EntityColumnLayout>
            <EntityColumn>
              <EntityDescription entity={entity} />
              <EntityWeSay entity={entity} />
              <ExternalLinks entity={entity} />
            </EntityColumn>
            <EntityColumn>
              <OpeningTimes entity={entity} dateStr={dateStr} />
              <EntityAddress venue={entity} />
              <EntityDisabilityAccess entity={entity} />
            </EntityColumn>
          </EntityColumnLayout>
        </EntityDetailsContainer>
        <BasicSection>
          <LazyLoad height={300} once>
            <EntityPageMap zoom={14} pin={entity.pin} />
          </LazyLoad>
        </BasicSection>
        <BasicSection>
          <LazyLoad height={100} once>
            <MonitorCollection
              title='Pending Venue Monitors'
              venue={entity}
              monitors={venueMonitors}
              getInProgress={gettingVenueMonitors}
              onMounted={this.handleVenueMonitorMounted}
              onSubmit={this.handleSubmitVenueMonitor}
              gridRowComponent={VenueMonitorGridRow}
            />
          </LazyLoad>
        </BasicSection>
        <BasicSection>
          <LazyLoad height={100} once>
            <MonitorCollection
              title='Pending Event Monitors'
              venue={entity}
              monitors={venueEventMonitors}
              getInProgress={gettingVenueEventMonitors}
              onMounted={this.handleVenueEventMonitorsMounted}
              onSubmit={this.handleSubmitVenueEventMonitor}
              gridRowComponent={EventMonitorGridRow}
            />
          </LazyLoad>
        </BasicSection>
      </React.Fragment>
    )
  }
}

VenueDetail.propTypes = {
  entity: PropTypes.instanceOf(FullVenue).isRequired,
  venueMonitors: PropTypes.array,
  venueEventMonitors: PropTypes.array,
  gettingVenueMonitors: PropTypes.bool.isRequired,
  gettingVenueEventMonitors: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect(
  /* istanbul ignore next */
  state => ({
    venueMonitors: venueSelectors.venueMonitors(state),
    gettingVenueMonitors: venueSelectors.gettingVenueMonitors(state),
    venueEventMonitors: venueSelectors.venueEventMonitors(state),
    gettingVenueEventMonitors: venueSelectors.gettingVenueEventMonitors(state)
  })
)(VenueDetail)
