import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Field, reduxForm } from 'redux-form'
import Form from '_src/components/form'
import FormRow from '_src/components/form/row'
import TextField from '_src/components/text/field'
import FormButtons from '_src/components/form/buttons'
import Divider from '_src/components/divider'
import { ALLOWED_TAG_TYPES } from '_src/constants/tag'
import tagConstraint from '_src/constants/tag-constraint'
import { TAG_EDITOR_FORM_NAME } from '_src/constants/form'
import './index.m.scss'

export const AddTagForm = ({ submitting, handleSubmit }) => (
  <Form styleName='container' onSubmit={handleSubmit}>
    <FormRow>
      <Field
        label='Tag Name'
        name='label'
        component={TextField}
        required
        maxLength={tagConstraint.label.length.maximum}
        autos={false}
        forceSingleLine
        containerStyle={{ flexBasis: 'auto' }}
      />
    </FormRow>
    <Divider />
    <FormButtons submitting={submitting} submitLabel='Add' />
  </Form>
)

AddTagForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  tagType: PropTypes.oneOf(ALLOWED_TAG_TYPES).isRequired
}

export default connect((_, ownProps) => ({
  initialValues: {
    label: '',
    tagType: ownProps.tagType,
    addTagForEvent: ownProps.addTagForEvent
  }
}))(
  reduxForm({
    form: TAG_EDITOR_FORM_NAME
  })(AddTagForm)
)
