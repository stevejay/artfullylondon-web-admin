import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'

import Form from '_src/shared/components/form'
import FormRow from '_src/shared/components/form/row'
import FormError from '_src/shared/components/form/error'
import TextField from '_src/shared/components/text/field'
import ButtonField from '_src/shared/components/button/field'
import * as tagConstants from '../constants'

export const AddTagForm = ({
  canAddTag,
  handleSubmit,
  pristine,
  submitting,
  error,
  className
}) => (
  <Form onSubmit={handleSubmit} className={className}>
    <FormRow>
      <Field
        label='Tag Name'
        name='label'
        component={TextField}
        required
        maxLength={tagConstants.CONSTRAINT.label.length.maximum}
        autos={false}
        forceSingleLine
        containerStyle={{ flexBasis: 'auto' }}
      />
      <ButtonField
        label='Add'
        type='submit'
        disabled={pristine || !canAddTag}
        submitting={submitting}
      />
    </FormRow>
    <FormError error={error} hideGenericErrorMessages />
  </Form>
)

AddTagForm.propTypes = {
  canAddTag: PropTypes.bool.isRequired,
  initialValues: PropTypes.object.isRequired,
  className: PropTypes.string,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.any
}

export default reduxForm({
  form: tagConstants.TAG_EDITOR_FORM_NAME,
  enableReinitialize: true,
  touchOnBlur: false
})(AddTagForm)
