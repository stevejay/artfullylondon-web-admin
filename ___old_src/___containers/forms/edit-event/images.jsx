import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm, isPristine } from 'redux-form'
import Form from '_src/components/form'
import FormRow from '_src/components/form/row'
import FormButtons from '_src/components/form/buttons'
import Divider from '_src/components/divider'
import FormError from '_src/components/form/error'
import { ENTITY_TYPE_EVENT } from '_src/constants/entity'
import ImagesField from '_src/components/images/field'
import {
  EDIT_EVENT_IMAGES_FORM_NAME,
  IMAGE_EDITOR_FORM_NAME
} from '_src/constants/form'
import { addNotification } from '_src/actions/notifications'
import * as imageActions from '_src/actions/image'
import { showModal } from '_src/actions/modal'

export class EditEventImagesForm extends React.Component {
  handleSubmit = values => {
    const { imageEditorIsPristine, onSubmit, addNotification } = this.props

    if (imageEditorIsPristine) {
      return onSubmit(values)
    } else {
      addNotification({
        type: 'Error',
        title: 'Submit Cancelled',
        message: 'There are unsaved changes in the Add Image editor.'
      })
    }
  }
  render () {
    const {
      handleSubmit,
      submitting,
      onCancel,
      isEdit,
      error,
      previousPage,
      imageActions,
      showModal
    } = this.props

    return (
      <Form onSubmit={() => handleSubmit(this.handleSubmit)}>
        <FormRow>
          <Field
            label='Images'
            entityType={ENTITY_TYPE_EVENT}
            name='images'
            component={ImagesField}
            parentFormName={EDIT_EVENT_IMAGES_FORM_NAME}
            imageActions={imageActions}
            showModal={showModal}
          />
        </FormRow>
        <Divider />
        <FormError error={error} />
        <FormButtons
          submitLabel='Submit'
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
  previousPage: PropTypes.func.isRequired,
  imageActions: PropTypes.object.isRequired,
  showModal: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired
}

const WrappedImagesForm = reduxForm({
  form: EDIT_EVENT_IMAGES_FORM_NAME
})(EditEventImagesForm)

export default connect(
  state => ({
    initialValues: state.eventForEdit.entity,
    isEdit: !!state.eventForEdit.entityId,
    imageEditorIsPristine: isPristine(IMAGE_EDITOR_FORM_NAME)(state)
  }),
  dispatch => ({
    imageActions: bindActionCreators(imageActions, dispatch),
    showModal: bindActionCreators(showModal, dispatch),
    addNotification: bindActionCreators(addNotification, dispatch)
  })
)(WrappedImagesForm)
