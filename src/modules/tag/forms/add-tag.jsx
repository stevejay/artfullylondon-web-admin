import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'

import Form from '_src/components/form'
import FormRow from '_src/components/form/row'
import FormError from '_src/components/form/error'
import TextField from '_src/components/text/field'
import ButtonField from '_src/components/button/field'
import * as formConstants from '_src/constants/form'
import * as tagConstants from '_src/modules/tag/constants'

export const AddTagForm = ({
  canAddTag,
  handleSubmit,
  pristine,
  submitting,
  error
}) => (
  <Form onSubmit={handleSubmit}>
    <FormRow>
      <Field
        label='Tag Name'
        name='label'
        component={TextField}
        required
        maxLength={tagConstants.constraint.label.length.maximum}
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
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  tagType: PropTypes.oneOf(tagConstants.ALLOWED_TAG_TYPES).isRequired,
  error: PropTypes.any
}

export default reduxForm({
  form: formConstants.TAG_EDITOR_FORM_NAME,
  enableReinitialize: true,
  touchOnBlur: false
})(AddTagForm)
