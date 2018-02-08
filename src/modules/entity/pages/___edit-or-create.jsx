import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Error } from '_src/modules/error'
import FadeTransition from '_src/components/transition/fade'
import BoxesLoader from '_src/components/loader/boxes'
import BasicSection from '_src/components/section/basic'
import * as entitiesPropTypes from '_src/entities/prop-types'
import * as entityConstants from '_src/constants/entity'
import * as entityActions from '_src/modules/entity/actions'
import { selectors as entitySelectors } from '_src/modules/entity/reducers'

export class EntityEditOrCreatePage extends React.Component {
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
      this.props.dispatch(entityActions.getEntity(entityType, entityId))
    } else {
      this.props.dispatch(entityActions.resetEntity(entityType))
    }
  }
  render () {
    const {
      entityType,
      entityId,
      entity,
      getInProgress,
      getFailed,
      component: Component
    } = this.props

    if (getFailed) {
      return <BasicSection><Error /></BasicSection>
    }

    if (getInProgress || !entity) {
      return <BasicSection><BoxesLoader /></BasicSection>
    }

    return (
      <FadeTransition in appear mountOnEnter unmountOnExit>
        <BasicSection>
          <Component entity={entity} isEdit={!!entityId} />
        </BasicSection>
      </FadeTransition>
    )
  }
}

EntityEditOrCreatePage.propTypes = {
  entityType: PropTypes.oneOf(entityConstants.EDITABLE_ENTITY_TYPES).isRequired,
  entityId: PropTypes.string,
  entity: entitiesPropTypes.EDITABLE_ENTITY,
  getInProgress: PropTypes.bool.isRequired,
  getFailed: PropTypes.bool.isRequired,
  component: PropTypes.element.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect(
  /* istanbul ignore next */
  (state, ownProps) => ({
    entityType: ownProps.match.params.entityType,
    entityId: ownProps.match.params[0],
    entity: entitySelectors.entity(state),
    getInProgress: entitySelectors.gettingEntity(state),
    getFailed: entitySelectors.failedToGetEntity(state)
  })
)(EntityEditOrCreatePage)
