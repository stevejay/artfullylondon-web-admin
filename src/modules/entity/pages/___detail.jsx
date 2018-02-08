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

// TODO merge entitydetailpage and editorcreate pages!

export class EntityDetailPage extends React.Component {
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
      getFailed,
      component: Component
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
          <Component entity={entity} />
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
)(EntityDetailPage)
