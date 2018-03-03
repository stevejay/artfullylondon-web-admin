import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm, isPristine } from 'redux-form'

import Form from '_src/shared/components/form'
import FormRow from '_src/shared/components/form/row'
import FormError from '_src/shared/components/form/error'
import FormButtons from '_src/shared/components/form/buttons'
import Divider from '_src/shared/components/divider'
import entityType from '_src/domain/types/entity-type'
import { ImagesField, IMAGE_EDITOR_FORM_NAME } from '_src/modules/image'
import { actions as notificationActions } from '_src/modules/notification'
import * as eventConstants from '../constants'

export class EditEventImagesForm extends React.Component {
  handleSubmit = values => {
    const { imageEditorIsPristine, onSubmit, dispatch } = this.props

    if (imageEditorIsPristine) {
      return onSubmit(values)
    } else {
      console.log('add error')

      dispatch(
        notificationActions.addErrorNotification(
          'Submit Cancelled',
          'There are unsaved changes in the Add Image editor.'
        )
      )
    }
  }
  render () {
    const {
      handleSubmit,
      submitting,
      onCancel,
      isEdit,
      error,
      previousPage
    } = this.props

    return (
      <Form onSubmit={handleSubmit(this.handleSubmit)}>
        <FormRow>
          <Field
            label='Images'
            parentFormName={eventConstants.EDIT_EVENT_IMAGES_FORM_NAME}
            entityType={entityType.EVENT}
            name='images'
            component={ImagesField}
          />
        </FormRow>
        <Divider />
        <FormError error={error} />
        <FormButtons
          submitLabel={isEdit ? 'Save Event' : 'Save and Create Event'}
          submitting={submitting}
          onCancel={isEdit ? onCancel : null}
          onPrevious={previousPage}
        />
      </Form>
    )
  }
}

EditEventImagesForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  isEdit: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.any,
  imageEditorIsPristine: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onPreviousPage: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect(
  /* istanbul ignore next */
  state => ({
    imageEditorIsPristine: isPristine(IMAGE_EDITOR_FORM_NAME)(state)
  })
)(
  reduxForm({
    form: eventConstants.EDIT_EVENT_IMAGES_FORM_NAME,
    enableReinitialize: true
  })(EditEventImagesForm)
)
