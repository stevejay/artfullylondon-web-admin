import React from 'react'
import PropTypes from 'prop-types'
import LazyLoad from 'react-lazyload'
import { connect } from 'react-redux'

import BasicSection from '_src/components/section/basic'
import EntityDescription from '_src/modules/entity/components/description'
import EntityDetailsContainer
  from '_src/modules/entity/components/details-container'
import { Image } from '_src/modules/image'
import { ExternalLinks } from '_src/modules/link'
import EntityHeading from '_src/modules/entity/components/heading'
import EntityWeSay from '_src/modules/entity/components/we-say'
import EntityInfoBar from '_src/modules/entity/components/info-bar'
import EntityColumnLayout from '_src/modules/entity/components/column-layout'
import EntityColumn from '_src/modules/entity/components/column'
import EntityAddress from '_src/modules/entity/components/address'
import EntityDisabilityAccess
  from '_src/modules/entity/components/disability-access'
import { EntityPageMap } from '_src/modules/location'
import OpeningTimes from '_src/modules/entity/components/opening-times'
import MonitorCollection from '_src/modules/venue/components/monitor/collection'
import VenueMonitorGridRow
  from '_src/modules/venue/components/monitor/venue-monitor-grid-row'
import EventMonitorGridRow
  from '_src/modules/venue/components/monitor/event-monitor-grid-row'
import { selectors as venueSelectors } from '_src/modules/venue/reducers'
import * as venueActions from '_src/modules/venue/actions'
import { FullVenue } from '_src/entities/venue'
import * as dateLib from '_src/lib/date'

export class VenueDetail extends React.Component {
  handleVenueMonitorMounted = () => {
    this.props.dispatch(venueActions.getVenueMonitor(this.props.entity.id))
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
      venueMonitor,
      gettingVenueMonitor,
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
              monitors={venueMonitor}
              getInProgress={gettingVenueMonitor}
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
  venueMonitor: PropTypes.object,
  venueEventMonitors: PropTypes.array,
  gettingVenueMonitor: PropTypes.bool.isRequired,
  gettingVenueEventMonitors: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect(
  /* istanbul ignore next */
  state => ({
    venueMonitor: venueSelectors.venueMonitor(state),
    gettingVenueMonitor: venueSelectors.gettingVenueMonitor(state),
    venueEventMonitors: venueSelectors.venueEventMonitors(state),
    gettingVenueEventMonitors: venueSelectors.gettingVenueEventMonitors(state)
  })
)(VenueDetail)
