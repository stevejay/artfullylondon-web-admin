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
import {
  MonitorCollection,
  VenueMonitorGridRow,
  EventMonitorGridRow,
  selectors as monitorSelectors,
  actions as monitorActions
} from '_src/modules/monitor'
import { FullVenue } from '_src/entities/venue'
import * as dateLib from '_src/lib/date'

export class VenueDetail extends React.Component {
  handleVenueMonitorMounted = () => {
    this.props.dispatch(monitorActions.getVenueMonitors(this.props.entity.id))
  }
  handleVenueEventMonitorsMounted = () => {
    this.props.dispatch(
      monitorActions.getVenueEventMonitors(this.props.entity.id)
    )
  }
  handleSubmitVenueMonitor = values => {
    return this.props.dispatch(monitorActions.updateVenueMonitor(values))
  }
  handleSubmitVenueEventMonitor = values => {
    return this.props.dispatch(monitorActions.updateVenueEventMonitor(values))
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
    const venueHomepageUrl = entity.getHomepageUrl()

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
              venueHomepageUrl={venueHomepageUrl}
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
              venueHomepageUrl={venueHomepageUrl}
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
    venueMonitors: monitorSelectors.venueMonitors(state),
    gettingVenueMonitors: monitorSelectors.gettingVenueMonitors(state),
    venueEventMonitors: monitorSelectors.venueEventMonitors(state),
    gettingVenueEventMonitors: monitorSelectors.gettingVenueEventMonitors(
      state
    )
  })
)(VenueDetail)
