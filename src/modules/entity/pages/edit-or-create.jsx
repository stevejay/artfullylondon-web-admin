import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import FadeTransition from '_src/components/transition/fade'
import Error from '_src/components/error'
import BoxesLoader from '_src/components/loader/boxes'
import BasicSection from '_src/components/section/basic'
import TalentEditOrCreate
  from '_src/modules/entity/components/talent-edit-or-create'
import VenueEditOrCreate
  from '_src/modules/entity/components/venue-edit-or-create'
import EventEditOrCreate
  from '_src/modules/entity/components/event-edit-or-create'
import EventSeriesEditOrCreate
  from '_src/modules/entity/components/event-series-edit-or-create'
import * as entityConstants from '_src/constants/entity'
import * as entityActions from '_src/store/actions/entity'

class EntityEditOrCreatePage extends React.Component {
  componentWillMount () {
    this._getOrResetEntity(this.props)
  }
  componentWillReceiveProps (nextProps) {
    if (
      nextProps.entityType !== this.props.entityType ||
      nextProps.entityId !== this.props.entityId
    ) {
      this._getOrResetEntity(nextProps)
    }
  }
  _getOrResetEntity ({ entityType, entityId }) {
    if (entityId) {
      this.props.dispatch(entityActions.getEntityForEdit(entityType, entityId))
    } else {
      this.props.dispatch(entityActions.resetEntityForEdit(entityType))
    }
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

    if (getInProgress || !entity) {
      return <BasicSection><BoxesLoader /></BasicSection>
    }

    const isEdit = !!entityId

    return (
      <FadeTransition in appear mountOnEnter unmountOnExit>
        <BasicSection>
          {entityType === entityConstants.ENTITY_TYPE_TALENT &&
            <TalentEditOrCreate entity={entity} isEdit={isEdit} />}
          {entityType === entityConstants.ENTITY_TYPE_VENUE &&
            <VenueEditOrCreate entity={entity} isEdit={isEdit} />}
          {entityType === entityConstants.ENTITY_TYPE_EVENT &&
            <EventEditOrCreate entity={entity} isEdit={isEdit} />}
          {entityType === entityConstants.ENTITY_TYPE_EVENT_SERIES &&
            <EventSeriesEditOrCreate entity={entity} isEdit={isEdit} />}
        </BasicSection>
      </FadeTransition>
    )
  }
}

EntityEditOrCreatePage.propTypes = {
  entityType: PropTypes.oneOf(entityConstants.EDITABLE_ENTITY_TYPES).isRequired,
  entityId: PropTypes.string,
  entity: PropTypes.object,
  getInProgress: PropTypes.bool.isRequired,
  getFailed: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect((state, ownProps) => ({
  entityType: ownProps.match.params.entityType,
  entityId: ownProps.match.params[0],
  entity: state[ownProps.match.params.entityType + '-for-edit'].entity,
  getInProgress: state[ownProps.match.params.entityType + '-for-edit']
    .getInProgress,
  getFailed: state[ownProps.match.params.entityType + '-for-edit'].getFailed
}))(EntityEditOrCreatePage)
