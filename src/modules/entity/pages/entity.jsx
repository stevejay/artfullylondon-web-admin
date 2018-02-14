import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { Error } from '_src/modules/error'
import FadeTransition from '_src/components/transition/fade'
import BoxesLoader from '_src/components/loader/boxes'
import BasicSection from '_src/components/section/basic'
import * as entitiesPropTypes from '_src/entities/prop-types'
import * as entityConstants from '_src/constants/entity'
import * as entityActions from '_src/modules/entity/actions'
import { selectors as entitySelectors } from '_src/modules/entity/reducers'

export class EntityPage extends React.Component {
  componentWillMount () {
    this._getOrResetEntity(this.props)
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.location !== this.props.location) {
      this._getOrResetEntity(nextProps)
    }
  }
  _getOrResetEntity ({ entityType, entityId }) {
    this.props.dispatch(
      entityId
        ? entityActions.getEntity(entityType, entityId)
        : entityActions.resetEntityForCreate(entityType)
    )
  }
  render () {
    const {
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

EntityPage.propTypes = {
  entityType: PropTypes.oneOf(entityConstants.EDITABLE_ENTITY_TYPES).isRequired,
  entityId: PropTypes.string,
  entity: entitiesPropTypes.EDITABLE_ENTITY,
  getInProgress: PropTypes.bool.isRequired,
  getFailed: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

export default withRouter(
  connect(
    /* istanbul ignore next */
    (state, ownProps) => ({
      // TODO create selector for match param
      entityId: ownProps.match.params[0],
      entity: entitySelectors.entity(state),
      getInProgress: entitySelectors.gettingEntity(state),
      getFailed: entitySelectors.failedToGetEntity(state)
    })
  )(EntityPage)
)
