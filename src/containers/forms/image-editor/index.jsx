import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import FormRow from '_src/components/form/row'
import FormError from '_src/components/form/error'
import TextField from '_src/components/text/field'
import SubFormButtons from '_src/components/form/sub-form-buttons'
import { IMAGE_EDITOR_FORM_NAME } from '_src/constants/form'

export const ImageEditorForm = ({
  pristine,
  submitting,
  handleSubmit,
  constraint,
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
        maxLength={constraint.imageUrl.length.maximum}
        autos={false}
        forceSingleLine
        containerStyle={{ flexBasis: 'auto' }}
      />
      <Field
        label='Copyright'
        name='copyright'
        component={TextField}
        maxLength={constraint.copyright.length.maximum}
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

ImageEditorForm.propTypes = {
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  constraint: PropTypes.object.isRequired,
  error: PropTypes.any
}

export default reduxForm({ form: IMAGE_EDITOR_FORM_NAME })(ImageEditorForm)
