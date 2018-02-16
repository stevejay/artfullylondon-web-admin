import React from 'react'
import PropTypes from 'prop-types'

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
import EventMainDetails from './main-details'
import EventSeriesLink from './event-series-link'
// import EventTalentCarousel from 'talent-carousel'
import { Image } from '_src/modules/image'
import Message from '_src/components/message'
import Divider from '_src/components/divider'
import { ExternalLinks } from '_src/modules/link'
import { FullEvent } from '_src/entities/event'
import { TagCollection } from '_src/modules/tag'
import * as dateLib from '_src/lib/date'

class EventDetail extends React.Component {
  handleClickCopy = () => {
    console.log('handleClickCopy')
    // this.props.getEventAsCopy({ id: this.props.entity.id })
  }
  render () {
    const { entity } = this.propTypes

    const dateStr = dateLib.getTodayDateAsString()
    const eventIsExpired = entity.isExpiredOn(dateStr)

    return (
      <React.Fragment>
        <Image entityType={entity.entityType} images={entity.images} />
        <EntityHeading>{entity.name}</EntityHeading>
        <EntityDetailsContainer>
          <EntityInfoBar entity={entity} onClickCopy={this.handleClickCopy} />
          {eventIsExpired &&
            <Message showIcon type='error'>
              This event has expired.
            </Message>}
          <EntityColumnLayout>
            <EntityColumn>
              <EventMainDetails event={entity} dateStr={dateStr} />
              <EntityDescription entity={entity} />
              <EntityWeSay entity={entity} />
              {entity.hasEventSeries &&
                <EventSeriesLink eventSeries={eventSeries} />}
              <ExternalLinks entity={entity} />
              {entity.hasTags && <Divider />}
              <TagCollection tags={entity.tags} />
              {entity.hasTalents && <Divider />}
              {/* <EventTalentCarousel
                  talents={entity.talents}
                  selectedTalentId={selectedTalentId}
                  onTalentSelected={talentSelected}
                /> */}
            </EntityColumn>
            <EntityColumn>
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

// TODO
// add state:  selectedTalentId: PropTypes.string,
// talentSelected: PropTypes.func.isRequired

EventDetail.propTypes = {
  entity: PropTypes.instanceOf(FullEvent).isRequired
}

export default EventDetail
