import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'

import FormRow from '_src/components/form/row'
import FormError from '_src/components/form/error'
import TextField from '_src/components/text/field'
import SubFormButtons from '_src/components/form/sub-form-buttons'
import * as formConstants from '_src/constants/form'
import { addImageConstraint } from '_src/constants/image-constraints'

export const ImagesEditorForm = ({
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
        maxLength={addImageConstraint.imageUrl.length.maximum}
        autos={false}
        forceSingleLine
        containerStyle={{ flexBasis: 'auto' }}
      />
      <Field
        label='Copyright'
        name='copyright'
        component={TextField}
        maxLength={addImageConstraint.copyright.length.maximum}
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

ImagesEditorForm.propTypes = {
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  error: PropTypes.any
}

export default reduxForm({
  form: formConstants.IMAGE_EDITOR_FORM_NAME,
  enableReinitialize: true
})(ImagesEditorForm)
