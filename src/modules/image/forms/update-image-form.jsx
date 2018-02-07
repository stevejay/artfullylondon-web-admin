import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'

import Form from '_src/components/form'
import FormRow from '_src/components/form/row'
import TextField from '_src/components/text/field'
import FormButtons from '_src/components/form/buttons'
import Divider from '_src/components/divider'
import * as formConstants from '_src/constants/form'
import * as imageConstants from '_src/modules/image/constants'
import './update-image-form.scss'

const FIELD_CONTAINER_STYLE = { flexBasis: 'auto' }

export const UpdateImageForm = ({ submitting, handleSubmit }) => (
  <Form styleName='container' onSubmit={handleSubmit}>
    <FormRow>
      <Field
        label='Copyright'
        name='copyright'
        component={TextField}
        required
        maxLength={
          imageConstants.UPDATE_IMAGE_CONSTRAINT.copyright.length.maximum
        }
        autos={false}
        containerStyle={FIELD_CONTAINER_STYLE}
      />
    </FormRow>
    <Divider />
    <FormButtons submitting={submitting} submitLabel='Submit' />
  </Form>
)

UpdateImageForm.propTypes = {
  initialValues: PropTypes.object,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default reduxForm({
  form: formConstants.UPDATE_IMAGE_FORM_NAME,
  enableReinitialize: true
})(UpdateImageForm)
