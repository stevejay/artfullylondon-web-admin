import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'

import FormRow from '_src/components/form/row'
import FormError from '_src/components/form/error'
import SubFormButtons from '_src/components/form/sub-form-buttons'
import TextField from '_src/components/text/field'
import SelectField from '_src/components/select/field'
import * as linkConstants from '../constants'

export const LinksEditorForm = ({
  pristine,
  submitting,
  handleSubmit,
  linkTypeOptions,
  reset,
  error
}) => (
  <div>
    <FormRow>
      <Field
        label='Link Type'
        name='linkType'
        component={SelectField}
        options={linkTypeOptions}
        required
        searchable={false}
        containerStyle={{ flexGrow: 0, minWidth: '14rem' }}
      />
      <Field
        label='Link URL'
        name='linkUrl'
        component={TextField}
        required
        maxLength={linkConstants.LINK_CONSTRAINT.linkUrl.length.maximum}
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

LinksEditorForm.propTypes = {
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  linkTypeOptions: PropTypes.array.isRequired,
  error: PropTypes.any
}

export default reduxForm({ form: linkConstants.LINK_EDITOR_FORM_NAME })(
  LinksEditorForm
)
