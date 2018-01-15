import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Field, reduxForm } from 'redux-form'
import FormRow from '_src/components/form/row'
import FormButtons from '_src/components/form/buttons'
import Form from '_src/components/form'
import Divider from '_src/components/divider'
import CheckboxField from '_src/components/checkbox/field'
import Diff from '_src/components/monitor/diff'
import { UPDATE_MONITOR_FORM_NAME } from '_src/constants/form'
import './index.scss'

export const UpdateMonitorForm = ({
  submitting,
  handleSubmit,
  initialValues: { hasChanged, changeDiff }
}) => (
  <Form styleName='container' onSubmit={handleSubmit}>
    <FormRow>
      <Diff changeDiff={changeDiff} />
    </FormRow>
    <FormRow>
      <Field
        label='Visibility'
        name='isIgnored'
        component={CheckboxField}
        checkboxLabel='Should be ignored'
      />
      {hasChanged &&
        <Field
          label='Has Changed'
          name='hasChanged'
          component={CheckboxField}
          checkboxLabel='Mark as has changed'
        />}
    </FormRow>
    <Divider />
    <FormButtons submitting={submitting} submitLabel='Submit' />
  </Form>
)

UpdateMonitorForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default connect((_, ownProps) => ({
  initialValues: ownProps.initialValues
}))(
  reduxForm({
    form: UPDATE_MONITOR_FORM_NAME
  })(UpdateMonitorForm)
)
