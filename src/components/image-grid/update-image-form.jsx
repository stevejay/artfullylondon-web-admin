import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'

import FormRow from '_src/components/form/row'
import TextField from '_src/components/text/field'
import FormButtons from '_src/components/form/buttons'
import Form from '_src/components/form'
import Divider from '_src/components/divider'
import * as formConstants from '_src/constants/form'
import { updateImageConstraint } from '_src/constants/image-constraints'
import './update-image-form.scss'

// TODO fix this form submit issue

export const UpdateImageForm = ({ submitting, handleSubmit }) => (
  <Form
    styleName='container'
    onSubmit={event => {
      // event.preventDefault()
      event.stopPropagation()
      handleSubmit(event)
    }}
  >
    <FormRow>
      <Field
        label='Copyright'
        name='copyright'
        component={TextField}
        required
        maxLength={updateImageConstraint.copyright.length.maximum}
        autos={false}
        containerStyle={{ flexBasis: 'auto' }}
      />
    </FormRow>
    <Divider />
    <FormButtons submitting={submitting} submitLabel='Submit' />
  </Form>
)

UpdateImageForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default reduxForm({
  form: formConstants.UPDATE_IMAGE_FORM_NAME,
  enableReinitialize: true
})(UpdateImageForm)
