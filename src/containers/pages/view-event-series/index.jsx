import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Loader from '_src/components/loader'
import Error from '_admin/pages/error'
import EntityImage from '_src/components/entity/image'
import InfoBar from '_src/components/entity/info-bar'
import SectionsContainer from '_src/components/section/sections-container'
import BasicSection from '_src/components/section/basic'
import CopyrightFooter from '_src/components/copyright-footer'
import DetailsContainer from '_src/components/entity/details-container'
import EntityDescription from '_src/components/entity/description'
import ExternalLinks from '_src/components/entity/external-links'
import EntityHeading from '_src/components/entity/heading'
import WeSay from '_src/components/entity/we-say'
import { FullEventSeries } from '_src/entities/event-series'

const ViewEventSeries = ({
  eventSeriesId,
  eventSeries,
  getInProgress,
  getFailed
}) => {
  if (getFailed) {
    return <Error statusCode={500} />
  }

  if (getInProgress || !eventSeries || eventSeries.id !== eventSeriesId) {
    return (
      <SectionsContainer>
        <Loader size='massive' />
      </SectionsContainer>
    )
  }

  const { entityType, images, name, links, weSay } = eventSeries

  return (
    <SectionsContainer>
      <BasicSection>
        <EntityImage entityType={entityType} images={images} />
        <EntityHeading>{name}</EntityHeading>
        <DetailsContainer type='narrow'>
          <InfoBar entity={eventSeries} />
          <EntityDescription entity={eventSeries} />
          <WeSay>{weSay}</WeSay>
          <ExternalLinks links={links} />
        </DetailsContainer>
      </BasicSection>
      <BasicSection>
        <CopyrightFooter />
      </BasicSection>
    </SectionsContainer>
  )
}

ViewEventSeries.propTypes = {
  eventSeriesId: PropTypes.string.isRequired,
  eventSeries: PropTypes.instanceOf(FullEventSeries),
  getInProgress: PropTypes.bool.isRequired,
  getFailed: PropTypes.bool.isRequired
}

export default connect((state, ownProps) => ({
  eventSeriesId: ownProps.params.splat,
  eventSeries: state.eventSeries.entity,
  getInProgress: state.eventSeries.getInProgress,
  getFailed: state.eventSeries.getFailed
}))(ViewEventSeries)
