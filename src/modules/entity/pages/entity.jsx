import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { withState } from 'recompose'
import log from 'loglevel'

import Error from '_src/shared/components/error'
import FadeTransition from '_src/shared/components/transition/fade'
import BoxesLoader from '_src/shared/components/loader/boxes'
import BasicSection from '_src/shared/components/section/basic'
import * as entitiesPropTypes from '_src/domain/prop-types'
import * as entityConstants from '../constants'
import * as entityActions from '../actions'
import { selectors as entitySelectors } from '../reducers'

// TODO could split into EntityDetailPage and EntityEditOrCreatePage?

export class EntityPage extends React.Component {
  componentWillMount () {
    this._getOrResetEntity(this.props)
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.location !== this.props.location) {
      this.props.setHasError(false)
      this._getOrResetEntity(nextProps)
    }
  }
  componentDidCatch (error, info) {
    this.props.setHasError(true)
    log.error(error, info.componentStack)
  }
  handleCancel = event => {
    event.preventDefault()
    this.props.history.goBack()
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
      component: Component,
      hasError
    } = this.props

    if (hasError || getFailed) {
      return <BasicSection><Error /></BasicSection>
    }

    if (getInProgress) {
      return <BasicSection><BoxesLoader /></BasicSection>
    }

    return (
      <FadeTransition in appear mountOnEnter unmountOnExit>
        <BasicSection>
          <Component
            entity={entity}
            isEdit={!!entityId}
            onCancel={this.handleCancel}
          />
        </BasicSection>
      </FadeTransition>
    )
  }
}

EntityPage.propTypes = {
  entityType: entitiesPropTypes.ENTITY_TYPE.isRequired,
  entityId: PropTypes.string,
  entity: entityConstants.EDITABLE_ENTITY_PROP_TYPE,
  getInProgress: PropTypes.bool.isRequired,
  getFailed: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  hasError: PropTypes.bool.isRequired,
  setHasError: PropTypes.func.isRequired
}

export default withRouter(
  connect(
    /* istanbul ignore next */
    (state, ownProps) => ({
      entityId: ownProps.match.params[0],
      entity: entitySelectors.entity(state),
      getInProgress: entitySelectors.gettingEntity(state, ownProps.entityType),
      getFailed: entitySelectors.failedToGetEntity(state)
    })
  )(withState('hasError', 'setHasError', false)(EntityPage))
)
