import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ALLOWED_TAG_TYPES } from '_src/constants/tag'
import Form from '_src/components/form'
import FormRow from '_src/components/form/row'
import TextField from '_src/components/text/field'
import ButtonField from '_src/components/button/field'
import FormError from '_src/components/form/error'
import { TAG_EDITOR_FORM_NAME } from '_src/constants/form'
import { addTag } from '_src/actions/tag'

export const TagEditorForm = ({
  handleSubmit,
  constraint,
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
        maxLength={constraint.label.length.maximum}
        autos={false}
        forceSingleLine
        containerStyle={{ flexBasis: 'auto' }}
      />
      <ButtonField
        label='Add'
        type='submit'
        disabled={pristine}
        submitting={submitting}
      />
    </FormRow>
    <FormError error={error} hideGenericErrorMessages />
  </Form>
)

TagEditorForm.propTypes = {
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  tagType: PropTypes.oneOf(ALLOWED_TAG_TYPES).isRequired,
  constraint: PropTypes.object.isRequired,
  error: PropTypes.any
}

export default connect(
  (_, ownProps) => ({
    initialValues: {
      label: '',
      tagType: ownProps.tagType
    }
  }),
  dispatch => ({
    onSubmit: bindActionCreators(addTag, dispatch)
  })
)(reduxForm({ form: TAG_EDITOR_FORM_NAME })(TagEditorForm))
