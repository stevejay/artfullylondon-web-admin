import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { isPristine } from 'redux-form'
import Loader from '_src/components/loader'
import Error from '_src/pages/error'
import EntityImage from '_src/components/entity/image'
import SectionsContainer from '_src/components/section/sections-container'
import DetailsContainer from '_src/components/entity/details-container'
import BasicSection from '_src/components/section/basic'
import CopyrightFooter from '_src/components/copyright-footer'
import EntityHeading from '_src/components/entity/heading'
import EditEventSeriesForm from '_src/containers/forms/edit-event-series'
import { ENTITY_TYPE_EVENT_SERIES } from '_src/constants/entity'
import {
  IMAGE_EDITOR_FORM_NAME,
  LINK_EDITOR_FORM_NAME
} from '_src/constants/form'
import { saveEntity } from '_src/actions/entity'
import { addNotification } from '_src/actions/notifications'
import constraint from '_src/constants/event-series-constraint'

class EditEventSeries extends React.Component {
  handleSubmit = values => {
    const {
      imageEditorIsPristine,
      linkEditorIsPristine,
      addNotification,
      saveEntity
    } = this.props

    if (imageEditorIsPristine && linkEditorIsPristine) {
      return saveEntity({
        entityType: ENTITY_TYPE_EVENT_SERIES,
        values,
        isEdit: !!this.props.eventSeriesId
      })
    }

    addNotification({
      type: 'Error',
      title: 'Submit Cancelled',
      message: 'There are unsaved changes in the sub editors.'
    })
  }
  handleCancel = event => {
    event.preventDefault()
    this.props.history.goBack()
  }
  render () {
    const { eventSeriesId, eventSeries, getInProgress, getFailed } = this.props

    if (getFailed) {
      return <Error statusCode={500} />
    }

    if (
      getInProgress ||
      !eventSeries ||
      (eventSeriesId && eventSeriesId !== eventSeries.id)
    ) {
      return (
        <SectionsContainer>
          <Loader size='massive' />
        </SectionsContainer>
      )
    }

    return this.renderEventSeries()
  }
  renderEventSeries () {
    const { eventSeries } = this.props
    const { images, name } = eventSeries

    return (
      <SectionsContainer>
        <BasicSection>
          <EntityImage entityType={ENTITY_TYPE_EVENT_SERIES} images={images} />
          <EntityHeading>{name || 'New Event Series'}</EntityHeading>
          <DetailsContainer>
            <EditEventSeriesForm
              constraint={constraint}
              onSubmit={this.handleSubmit}
              onCancel={this.handleCancel}
            />
          </DetailsContainer>
        </BasicSection>
        <BasicSection>
          <CopyrightFooter />
        </BasicSection>
      </SectionsContainer>
    )
  }
}

EditEventSeries.propTypes = {
  eventSeriesId: PropTypes.string,
  eventSeries: PropTypes.object,
  getInProgress: PropTypes.bool.isRequired,
  getFailed: PropTypes.bool.isRequired,
  imageEditorIsPristine: PropTypes.bool.isRequired,
  linkEditorIsPristine: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  saveEntity: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired
}

export default withRouter(
  connect(
    (state, ownProps) => ({
      eventSeriesId: ownProps.params.splat,
      eventSeries: state.eventSeriesForEdit.entity,
      getInProgress: state.eventSeriesForEdit.getInProgress,
      getFailed: state.eventSeriesForEdit.getFailed,
      imageEditorIsPristine: isPristine(IMAGE_EDITOR_FORM_NAME)(state),
      linkEditorIsPristine: isPristine(LINK_EDITOR_FORM_NAME)(state)
    }),
    dispatch => ({
      saveEntity: bindActionCreators(saveEntity, dispatch),
      addNotification: bindActionCreators(addNotification, dispatch)
    })
  )(EditEventSeries)
)
