import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Loader from '_src/components/loader'
import Error from '_src/pages/error'
import { ENTITY_TYPE_EVENT } from '_src/constants/entity'
import { getTodayDateAndTimeAsStrings } from '_src/lib/time'
import SectionsContainer from '_src/components/section/sections-container'
import BasicSection from '_src/components/section/basic'
import CopyrightFooter from '_src/components/copyright-footer'
import Divider from '_src/components/divider'
import Message from '_src/components/message'
import DetailsContainer from '_src/components/entity/details-container'
import EntityColumnLayout from '_src/components/entity/column-layout'
import EntityColumn from '_src/components/entity/column'
import EntityDescription from '_src/components/entity/description'
import EntityHeading from '_src/components/entity/heading'
import EntityImage from '_src/components/entity/image'
import ExternalLinks from '_src/components/entity/external-links'
import EntityMap from '_src/components/entity/map'
import OpeningTimes from '_src/components/opening-times'
import WeSay from '_src/components/entity/we-say'
import { FullEvent } from '_src/entities/event'
import EventMainDetails from '_src/components/event/main-details'
import EventSeriesLink from '_src/components/event/event-series-link'
import EventTalentCarousel from '_src/components/event/talent-carousel'
import TagCollection from '_src/components/tag/collection'
import InfoBar from '_src/components/entity/info-bar'
import { getEventAsCopy, talentSelected } from '_src/actions/entity'

class ViewEvent extends React.Component {
  handleClickCopy = () => {
    this.props.getEventAsCopy({ id: this.props.eventId })
  }
  render () {
    const {
      eventId,
      event,
      getInProgress,
      getFailed,
      talentSelected,
      selectedTalentId
    } = this.props

    if (getFailed) {
      return <Error statusCode={500} />
    }

    if (getInProgress || !event || event.id !== eventId) {
      return (
        <SectionsContainer>
          <Loader size='massive' />
        </SectionsContainer>
      )
    }

    const {
      entityType,
      images,
      name,
      tags,
      links,
      weSay,
      eventSeries,
      talents,
      pin
    } = event

    const { dateStr, timeStr } = getTodayDateAndTimeAsStrings()
    const eventIsExpired = event.isExpiredOn(dateStr)
    const showTalents = event.hasTalents

    return (
      <SectionsContainer>
        <BasicSection>
          <EntityImage entityType={entityType} images={images} />
          <EntityHeading>{name}</EntityHeading>
          <DetailsContainer>
            <InfoBar entity={event} onClickCopy={this.handleClickCopy} />
            {eventIsExpired &&
              <Message showIcon type='error'>
                This event has expired.
              </Message>}
            <EntityColumnLayout>
              <EntityColumn>
                <EventMainDetails event={event} dateStr={dateStr} />
                <EntityDescription entity={event} />
                <WeSay>{weSay}</WeSay>
                {event.hasEventSeries &&
                  <EventSeriesLink eventSeries={eventSeries} />}
                <ExternalLinks links={links} />
                {event.hasTags && <Divider />}
                <TagCollection tags={tags} />
                {showTalents && <Divider />}
                <EventTalentCarousel
                  talents={talents}
                  selectedTalentId={selectedTalentId}
                  onTalentSelected={talentSelected}
                />
              </EntityColumn>
              <EntityColumn>
                {!eventIsExpired &&
                  <OpeningTimes
                    entityType={ENTITY_TYPE_EVENT}
                    entity={event}
                    dateStr={dateStr}
                    timeStr={timeStr}
                  />}
                {!eventIsExpired && event.hasTalents && <Divider />}
              </EntityColumn>
            </EntityColumnLayout>
          </DetailsContainer>
        </BasicSection>
        <BasicSection>
          <EntityMap zoom={14} pin={pin} />
        </BasicSection>
        <CopyrightFooter />
      </SectionsContainer>
    )
  }
}

ViewEvent.propTypes = {
  eventId: PropTypes.string.isRequired,
  event: PropTypes.instanceOf(FullEvent),
  getInProgress: PropTypes.bool.isRequired,
  getFailed: PropTypes.bool.isRequired,
  getEventAsCopy: PropTypes.func.isRequired,
  selectedTalentId: PropTypes.string,
  talentSelected: PropTypes.func.isRequired
}

export default connect(
  (state, ownProps) => ({
    eventId: ownProps.params.splat,
    event: state.event.entity,
    getInProgress: state.event.getInProgress,
    getFailed: state.event.getFailed,
    selectedTalentId: state.event.selectedTalentId
  }),
  dispatch => ({
    getEventAsCopy: bindActionCreators(getEventAsCopy, dispatch),
    talentSelected: bindActionCreators(talentSelected, dispatch)
  })
)(ViewEvent)
