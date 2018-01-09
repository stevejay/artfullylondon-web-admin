import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Loader from '_src/components/loader'
import Error from '_admin/pages/error'
import SectionsContainer from '_src/components/section/sections-container'
import BasicSection from '_src/components/section/basic'
import CopyrightFooter from '_src/components/copyright-footer'

const ViewVenue = ({ getInProgress, getFailed, eventMonitors }) => {
  if (getFailed) {
    return <Error statusCode={500} />
  }

  if (getInProgress) {
    return (
      <SectionsContainer>
        <Loader size='massive' />
      </SectionsContainer>
    )
  }

  return (
    <SectionsContainer>
      <BasicSection>
        {eventMonitors.map(monitor => <div>{monitor.externalEventId}</div>)}
      </BasicSection>
      <BasicSection>
        <CopyrightFooter />
      </BasicSection>
    </SectionsContainer>
  )
}

ViewVenue.propTypes = {
  venueId: PropTypes.string.isRequired,
  eventMonitors: PropTypes.arrayOf(
    PropTypes.shape({
      externalEventId: PropTypes.string.isRequired
    })
  ).isRequired,
  getInProgress: PropTypes.bool.isRequired,
  getFailed: PropTypes.bool.isRequired
}

export default connect((state, ownProps) => ({
  venueId: ownProps.params.splat,
  eventMonitors: state.eventMonitors.eventMonitors,
  getInProgress: state.eventMonitors.getInProgress,
  getFailed: state.eventMonitors.getFailed
}))(ViewVenue)
