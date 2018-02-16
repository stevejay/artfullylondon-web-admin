import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import * as reduxForm from 'redux-form'

import { Image, IMAGE_EDITOR_FORM_NAME } from '_src/modules/image'
import {
  EntityDetailsContainer,
  EntityHeading,
  actions as entityActions
} from '_src/modules/entity'
import EditEventSeriesForm from '../forms/edit-event-series'
import { actions as notificationActions } from '_src/modules/notification'
import { LINK_EDITOR_FORM_NAME } from '_src/modules/link'
import * as entityConstants from '_src/constants/entity'
import * as eventSeriesConstants from '../constants'
import * as eventSeriesMapper from '../lib/mapper'
import { FullEventSeries } from '_src/entities/event-series'

export class EventSeriesEditOrCreate extends React.Component {
  shouldComponentUpdate (nextProps) {
    return nextProps.entity !== this.props.entity
  }
  handleSubmit = values => {
    const {
      imageEditorIsPristine,
      linkEditorIsPristine,
      isEdit,
      dispatch
    } = this.props

    if (imageEditorIsPristine && linkEditorIsPristine) {
      dispatch(
        entityActions.saveEntity(
          entityConstants.ENTITY_TYPE_EVENT_SERIES,
          values,
          isEdit,
          eventSeriesConstants.EDIT_EVENT_SERIES_FORM_NAME,
          eventSeriesConstants.EVENT_SERIES_NORMALISER,
          eventSeriesConstants.EVENT_SERIES_CONSTRAINT,
          eventSeriesMapper.mapSubmittedValues
        )
      )
    } else {
      dispatch(
        notificationActions.addErrorNotification(
          'Submit Cancelled',
          'There are unsaved changes in the sub editors.'
        )
      )
    }
  }
  handleCancel = event => {
    event.preventDefault()
    this.props.history.push(`/event-series/${this.props.entity.id}`)
  }
  render () {
    const { entity, isEdit } = this.props

    return (
      <React.Fragment>
        <Image
          entityType={entityConstants.ENTITY_TYPE_EVENT_SERIES}
          images={entity.images}
        />
        <EntityHeading>
          {entity.name || 'New Event Series'}
        </EntityHeading>
        <EntityDetailsContainer>
          <EditEventSeriesForm
            isEdit={isEdit}
            initialValues={eventSeriesMapper.getInitialValues(entity)}
            onSubmit={this.handleSubmit}
            onCancel={this.handleCancel}
          />
        </EntityDetailsContainer>
      </React.Fragment>
    )
  }
}

EventSeriesEditOrCreate.propTypes = {
  entity: PropTypes.instanceOf(FullEventSeries).isRequired,
  isEdit: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  imageEditorIsPristine: PropTypes.bool.isRequired,
  linkEditorIsPristine: PropTypes.bool.isRequired
}

export default withRouter(
  connect(
    /* istanbul ignore next */
    state => ({
      imageEditorIsPristine: reduxForm.isPristine(IMAGE_EDITOR_FORM_NAME)(
        state
      ),
      linkEditorIsPristine: reduxForm.isPristine(LINK_EDITOR_FORM_NAME)(state)
    })
  )(EventSeriesEditOrCreate)
)
