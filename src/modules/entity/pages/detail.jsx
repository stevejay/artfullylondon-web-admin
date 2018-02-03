import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import FadeTransition from '_src/components/transition/fade'
import Error from '_src/components/error'
import BoxesLoader from '_src/components/loader/boxes'
import BasicSection from '_src/components/section/basic'
import TalentDetail from '_src/modules/entity/components/talent-detail'
import VenueDetail from '_src/modules/entity/components/venue-detail'
import EventDetail from '_src/modules/entity/components/event-detail'
import EventSeriesDetail
  from '_src/modules/entity/components/event-series-detail'
import * as entitiesPropTypes from '_src/entities/prop-types'
import * as entityConstants from '_src/constants/entity'
import { selectors, entityActions } from '_src/store'

class EntityDetailPage extends React.Component {
  componentWillMount () {
    this._getEntity(this.props)
  }
  componentWillReceiveProps (nextProps) {
    if (
      nextProps.entityType !== this.props.entityType ||
      nextProps.entityId !== this.props.entityId
    ) {
      this._getEntity(nextProps)
    }
  }
  _getEntity ({ entityType, entityId }) {
    this.props.dispatch(entityActions.getEntity(entityType, entityId))
  }
  render () {
    const {
      entityType,
      entityId,
      entity,
      getInProgress,
      getFailed
    } = this.props

    if (getFailed) {
      return <BasicSection><Error /></BasicSection>
    }

    if (getInProgress || !entity || entity.id !== entityId) {
      return <BasicSection><BoxesLoader /></BasicSection>
    }

    return (
      <FadeTransition in appear mountOnEnter unmountOnExit>
        <BasicSection>
          {entityType === entityConstants.ENTITY_TYPE_TALENT &&
            <TalentDetail entity={entity} />}
          {entityType === entityConstants.ENTITY_TYPE_VENUE &&
            <VenueDetail entity={entity} />}
          {entityType === entityConstants.ENTITY_TYPE_EVENT &&
            <EventDetail entity={entity} />}
          {entityType === entityConstants.ENTITY_TYPE_EVENT_SERIES &&
            <EventSeriesDetail entity={entity} />}
        </BasicSection>
      </FadeTransition>
    )
  }
}

EntityDetailPage.propTypes = {
  entityType: PropTypes.oneOf(entityConstants.EDITABLE_ENTITY_TYPES).isRequired,
  entityId: PropTypes.string.isRequired,
  entity: entitiesPropTypes.EDITABLE_ENTITY,
  getInProgress: PropTypes.bool.isRequired,
  getFailed: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect((state, ownProps) => ({
  entityType: ownProps.match.params.entityType,
  entityId: ownProps.match.params[0],
  entity: selectors.entity(state),
  getInProgress: selectors.gettingEntity(state),
  getFailed: selectors.failedToGetEntity(state)
}))(EntityDetailPage)
