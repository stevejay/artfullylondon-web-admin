import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import FormRow from '_src/components/form/row'
import FormError from '_src/components/form/error'
import SubFormButtons from '_src/components/form/sub-form-buttons'
import TextField from '_src/components/text/field'
import DropdownField from '_src/components/dropdown/field'
import { LINK_EDITOR_FORM_NAME } from '_src/constants/form'

export const LinkEditorForm = ({
  pristine,
  submitting,
  handleSubmit,
  constraint,
  linkTypeOptions,
  reset,
  error
}) => (
  <div>
    <FormRow>
      <Field
        label='Link Type'
        name='linkType'
        component={DropdownField}
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
        maxLength={constraint.linkUrl.length.maximum}
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

LinkEditorForm.propTypes = {
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  constraint: PropTypes.shape({
    linkUrl: PropTypes.object.isRequired
  }).isRequired,
  linkTypeOptions: PropTypes.array.isRequired,
  error: PropTypes.any
}

export default reduxForm({ form: LINK_EDITOR_FORM_NAME })(LinkEditorForm)
