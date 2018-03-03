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
import * as entityType from '_src/domain/types/entity-type'
import * as entityConstants from '../constants'
import * as entityActions from '../actions'
import {
  actions as tagActions,
  selectors as tagSelectors
} from '_src/modules/tag'
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
  shouldComponentUpdate (nextProps) {
    return (
      nextProps.getInProgress !== this.props.getInProgress ||
      nextProps.getFailed !== this.props.getFailed ||
      nextProps.gettingTags !== this.props.gettingTags ||
      nextProps.entity !== this.props.entity
    )
  }
  componentDidCatch (error, info) {
    this.props.setHasError(true)
    log.error(error, info.componentStack)
  }
  handleCancel = event => {
    event.preventDefault()
    this.props.history.goBack()
  }
  _getOrResetEntity ({ entityType, entityId, viewing, location }) {
    const { dispatch } = this.props

    if (!viewing) {
      dispatch(tagActions.getTags())
    }

    if (location.state && location.state.copyEntityId) {
      dispatch(
        entityActions.copyEntity(entityType, location.state.copyEntityId)
      )
    } else if (entityId) {
      dispatch(entityActions.getEntity(entityType, entityId))
    } else {
      dispatch(entityActions.resetEntityForCreate(entityType))
    }
  }
  render () {
    const {
      entityId,
      entity,
      getInProgress,
      getFailed,
      gettingTags,
      component: Component,
      hasError
    } = this.props

    if (hasError || getFailed) {
      return <BasicSection><Error /></BasicSection>
    }

    if (getInProgress || gettingTags) {
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
  entityType: PropTypes.oneOf(entityType.VALUES).isRequired,
  viewing: PropTypes.bool.isRequired,
  entityId: PropTypes.string,
  entity: entityConstants.EDITABLE_ENTITY_PROP_TYPE,
  getInProgress: PropTypes.bool.isRequired,
  getFailed: PropTypes.bool.isRequired,
  gettingTags: PropTypes.bool.isRequired,
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
      getInProgress: entitySelectors.gettingEntity(
        state,
        ownProps.entityType,
        ownProps.match.params[0]
      ),
      getFailed: entitySelectors.failedToGetEntity(state),
      gettingTags: tagSelectors.gettingTags(state)
    })
  )(withState('hasError', 'setHasError', false)(EntityPage))
)
