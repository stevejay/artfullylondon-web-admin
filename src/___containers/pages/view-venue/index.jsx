import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import LazyLoad from 'react-lazyload'
import { bindActionCreators } from 'redux'
import Loader from '_src/components/loader'
import Error from '_src/pages/error'
import { ENTITY_TYPE_VENUE } from '_src/constants/entity'
import { getTodayDateAndTimeAsStrings } from '_src/lib/time'
import EntityImage from '_src/components/entity/image'
import Address from '_src/components/entity/address'
import DisabilityAccess from '_src/components/entity/disability-access'
import SectionHeading from '_src/components/entity/section-heading'
import SectionsContainer from '_src/components/section/sections-container'
import BasicSection from '_src/components/section/basic'
import CopyrightFooter from '_src/components/copyright-footer'
import DetailsContainer from '_src/components/entity/details-container'
import EntityColumnLayout from '_src/components/entity/column-layout'
import EntityColumn from '_src/components/entity/column'
import ExternalLinks from '_src/components/entity/external-links'
import WeSay from '_src/components/entity/we-say'
import { FullVenue } from '_src/entities/venue'
import EntityDescription from '_src/components/entity/description'
import EntityHeading from '_src/components/entity/heading'
import EntityMap from '_src/components/entity/map'
import OpeningTimes from '_src/components/opening-times'
import MonitorCollection from '_src/components/monitor/collection'
import {
  getVenueEventMonitors,
  getVenueEventMonitor,
  updateVenueEventMonitor,
  getVenueMonitor,
  updateVenueMonitor
} from '_src/actions/monitors'
import UpdateVenueEventMonitorModal
  from '_src/containers/modals/update-venue-event-monitor'
import UpdateVenueMonitorModal
  from '_src/containers/modals/update-venue-monitor'
import EventMonitorGridRow
  from '_src/components/monitor/event-monitor-grid-row'
import VenueMonitorGridRow
  from '_src/components/monitor/venue-monitor-grid-row'
import { showModal } from '_src/actions/modal'
import InfoBar from '_src/components/entity/info-bar'

class ViewVenue extends React.Component {
  handleEventMonitorsMounted = () => {
    this.props.getVenueEventMonitors({
      venueId: this.props.venueId
    })
  }
  handleVenueMonitorMounted = () => {
    this.props.getVenueMonitor({
      venueId: this.props.venueId
    })
  }
  handleEditEventMonitor = ({ externalEventId }) => {
    const {
      showModal,
      venueId,
      getVenueEventMonitor,
      updateVenueEventMonitor
    } = this.props

    getVenueEventMonitor({ venueId, externalEventId })

    showModal({
      component: UpdateVenueEventMonitorModal,
      componentProps: { onSubmit: updateVenueEventMonitor }
    })
  }
  handleEditVenueMonitor = () => {
    const { showModal, updateVenueMonitor } = this.props

    showModal({
      component: UpdateVenueMonitorModal,
      componentProps: { onSubmit: updateVenueMonitor }
    })
  }
  render () {
    const { venueId, venue, getInProgress, getFailed } = this.props

    if (getFailed) {
      return <Error statusCode={500} />
    }

    if (getInProgress || !venue || venue.id !== venueId) {
      return (
        <SectionsContainer>
          <Loader size='massive' />
        </SectionsContainer>
      )
    }

    return this.renderVenue()
  }
  renderVenue () {
    const {
      venue,
      eventMonitors,
      getEventMonitorsInProgress,
      venueMonitor,
      getVenueMonitorInProgress
    } = this.props

    const {
      entityType,
      images,
      name,
      links,
      weSay,
      telephone,
      email,
      wheelchairAccessType,
      disabledBathroomType,
      hearingFacilitiesType,
      pin
    } = venue

    const { dateStr, timeStr } = getTodayDateAndTimeAsStrings()

    return (
      <SectionsContainer>
        <BasicSection>
          <EntityImage entityType={entityType} images={images} />
          <EntityHeading>{name}</EntityHeading>
          <DetailsContainer>
            <InfoBar entity={venue} />
            <EntityColumnLayout>
              <EntityColumn>
                <EntityDescription entity={venue} />
                <WeSay>{weSay}</WeSay>
                <ExternalLinks
                  email={email}
                  telephone={telephone}
                  links={links}
                />
              </EntityColumn>
              <EntityColumn>
                <OpeningTimes
                  entityType={ENTITY_TYPE_VENUE}
                  entity={venue}
                  dateStr={dateStr}
                  timeStr={timeStr}
                />
                <Address fullAddress={venue.createFullAddress()} />
                <DisabilityAccess
                  wheelchairAccessType={wheelchairAccessType}
                  disabledBathroomType={disabledBathroomType}
                  hearingFacilitiesType={hearingFacilitiesType}
                  links={links}
                />
              </EntityColumn>
            </EntityColumnLayout>
          </DetailsContainer>
        </BasicSection>
        <BasicSection>
          <LazyLoad height={300} once>
            <EntityMap zoom={14} pin={pin} />
          </LazyLoad>
        </BasicSection>
        <BasicSection>
          <SectionHeading>Pending Venue Monitors</SectionHeading>
          <LazyLoad height={100} once>
            <MonitorCollection
              venue={venue}
              monitors={venueMonitor ? [venueMonitor] : []}
              getInProgress={getVenueMonitorInProgress}
              onMounted={this.handleVenueMonitorMounted}
              onEdit={this.handleEditVenueMonitor}
              gridRowComponent={VenueMonitorGridRow}
            />
          </LazyLoad>
        </BasicSection>
        <BasicSection>
          <SectionHeading>Pending Event Monitors</SectionHeading>
          <LazyLoad height={100} once>
            <MonitorCollection
              venue={venue}
              monitors={eventMonitors}
              getInProgress={getEventMonitorsInProgress}
              onMounted={this.handleEventMonitorsMounted}
              onEdit={this.handleEditEventMonitor}
              gridRowComponent={EventMonitorGridRow}
            />
          </LazyLoad>
        </BasicSection>
        <BasicSection>
          <CopyrightFooter />
        </BasicSection>
      </SectionsContainer>
    )
  }
}

ViewVenue.propTypes = {
  venueId: PropTypes.string.isRequired,
  venue: PropTypes.instanceOf(FullVenue),
  getInProgress: PropTypes.bool.isRequired,
  getFailed: PropTypes.bool.isRequired,
  eventMonitors: PropTypes.arrayOf(
    PropTypes.shape({
      externalEventId: PropTypes.string.isRequired
    })
  ).isRequired,
  getEventMonitorsInProgress: PropTypes.bool.isRequired,
  venueMonitor: PropTypes.object,
  getVenueMonitorInProgress: PropTypes.bool.isRequired,
  getVenueEventMonitors: PropTypes.func.isRequired,
  getVenueEventMonitor: PropTypes.func.isRequired,
  updateVenueEventMonitor: PropTypes.func.isRequired,
  getVenueMonitor: PropTypes.func.isRequired,
  updateVenueMonitor: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired
}

export default connect(
  (state, ownProps) => ({
    venueId: ownProps.params.splat,
    venue: state.venue.entity,
    getInProgress: state.venue.getInProgress,
    getFailed: state.venue.getFailed,
    eventMonitors: state.eventMonitors.venueEventMonitors,
    getEventMonitorsInProgress: state.eventMonitors
      .getVenueEventMonitorsInProgress,
    venueMonitor: state.venueMonitorForEdit.venueMonitor,
    getVenueMonitorInProgress: state.venueMonitorForEdit.getInProgress
  }),
  dispatch => ({
    getVenueEventMonitors: bindActionCreators(getVenueEventMonitors, dispatch),
    getVenueEventMonitor: bindActionCreators(getVenueEventMonitor, dispatch),
    updateVenueEventMonitor: bindActionCreators(
      updateVenueEventMonitor,
      dispatch
    ),
    getVenueMonitor: bindActionCreators(getVenueMonitor, dispatch),
    updateVenueMonitor: bindActionCreators(updateVenueMonitor, dispatch),
    showModal: bindActionCreators(showModal, dispatch)
  })
)(ViewVenue)
