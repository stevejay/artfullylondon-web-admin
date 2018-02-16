import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'

import FormRow from '_src/components/form/row'
import FormError from '_src/components/form/error'
import TextField from '_src/components/text/field'
import SubFormButtons from '_src/components/form/sub-form-buttons'
import * as imageConstants from '../constants'

export const AddImageForm = ({
  pristine,
  submitting,
  handleSubmit,
  reset,
  error
}) => (
  <div>
    <FormRow>
      <Field
        label='Image URL'
        name='imageUrl'
        component={TextField}
        required
        maxLength={imageConstants.ADD_IMAGE_CONSTRAINT.imageUrl.length.maximum}
        autos={false}
        forceSingleLine
        containerStyle={{ flexBasis: 'auto' }}
      />
      <Field
        label='Copyright'
        name='copyright'
        component={TextField}
        maxLength={imageConstants.ADD_IMAGE_CONSTRAINT.copyright.length.maximum}
        autos={false}
        forceSingleLine
        containerStyle={{ flexBasis: 'auto' }}
      />
    </FormRow>
    <FormError error={error} hideGenericErrorMessages />
    <SubFormButtons
      submitting={submitting}
      pristine={pristine}
      onSubmit={handleSubmit}
      onReset={reset}
    />
  </div>
)

AddImageForm.propTypes = {
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  error: PropTypes.any
}

export default reduxForm({
  form: imageConstants.IMAGE_EDITOR_FORM_NAME,
  enableReinitialize: true
})(AddImageForm)
