import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Field, reduxForm } from 'redux-form'
import FormRow from '_src/components/form/row'
import TextField from '_src/components/text/field'
import FormButtons from '_src/components/form/buttons'
import Form from '_src/components/form'
import Divider from '_src/components/divider'
import { UPDATE_IMAGE_FORM_NAME } from '_src/constants/form'
import { updateImageConstraint } from '_src/constants/image-constraints'
import './index.m.scss'

export const UpdateImageForm = ({ submitting, handleSubmit }) => (
  <Form styleName='container' onSubmit={handleSubmit}>
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
  onSubmit: PropTypes.func.isRequired,
  formData: PropTypes.shape({ copyright: PropTypes.string }).isRequired
}

export default connect((_state, ownProps) => ({
  initialValues: {
    copyright: ownProps.formData.copyright || ''
  }
}))(
  reduxForm({
    form: UPDATE_IMAGE_FORM_NAME
  })(UpdateImageForm)
)
