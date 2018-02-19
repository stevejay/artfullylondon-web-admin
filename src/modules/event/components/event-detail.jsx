import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  EntityDescription,
  EntityDetailsContainer,
  EntityHeading,
  EntityInfoBar,
  EntityWeSay,
  EntityColumnLayout,
  EntityColumn,
  OpeningTimes
} from '_src/modules/entity'
import BasicSection from '_src/components/section/basic'
import { EntityPageMap } from '_src/modules/location'
import EventMainDetails from './main-details'
import EventSeriesLink from './event-series-link'
import EventTalentCarousel from './talent-carousel'
import { Image } from '_src/modules/image'
import Message from '_src/components/message'
import Divider from '_src/components/divider'
import { ExternalLinks } from '_src/modules/link'
import { FullEvent } from '_src/domain/event'
import { TagCollection } from '_src/modules/tag'
import * as dateLib from '_src/lib/date'
import { selectors as eventSelectors } from '../reducers'
import * as eventActions from '../actions'

export class EventDetail extends React.Component {
  handleClickCopy = () => {
    console.log('handleClickCopy')
    // this.props.getEventAsCopy({ id: this.props.entity.id })
  }
  handleTalentSelected = ({ talentId }) => {
    this.props.dispatch(eventActions.updateSelectedTalent(talentId))
  }
  render () {
    const { entity, selectedTalentId } = this.props
    const dateStr = dateLib.getTodayDateAsString()
    const eventIsExpired = entity.isExpiredOn(dateStr)

    return (
      <React.Fragment>
        <Image entityType={entity.entityType} images={entity.images} />
        <EntityHeading>{entity.name}</EntityHeading>
        <EntityDetailsContainer>
          <EntityInfoBar entity={entity} onClickCopy={this.handleClickCopy} />
          <EntityColumnLayout>
            <EntityColumn>
              <EventMainDetails event={entity} dateStr={dateStr} />
              <EntityDescription entity={entity} />
              <EntityWeSay entity={entity} />
              {entity.hasEventSeries &&
                <EventSeriesLink eventSeries={entity.eventSeries} />}
              <ExternalLinks entity={entity} />
              {entity.hasTags && <Divider />}
              <TagCollection tags={entity.tags} />
              {entity.hasTalents && <Divider />}
              <EventTalentCarousel
                talents={entity.talents}
                selectedTalentId={selectedTalentId}
                onTalentSelected={this.handleTalentSelected}
              />
            </EntityColumn>
            <EntityColumn>
              {eventIsExpired &&
                <Message showIcon type='error'>
                  This event has expired.
                </Message>}
              {!eventIsExpired &&
                <OpeningTimes entity={entity} dateStr={dateStr} />}
              {!eventIsExpired && entity.hasTalents && <Divider />}
            </EntityColumn>
          </EntityColumnLayout>
        </EntityDetailsContainer>
        <BasicSection>
          <EntityPageMap zoom={14} pin={entity.pin} />
        </BasicSection>
      </React.Fragment>
    )
  }
}

EventDetail.propTypes = {
  entity: PropTypes.instanceOf(FullEvent).isRequired,
  selectedTalentId: PropTypes.string,
  dispatch: PropTypes.func.isRequired
}

export default connect(
  /* istanbul ignore next */
  state => ({
    selectedTalentId: eventSelectors.selectedTalentId(state)
  })
)(EventDetail)
