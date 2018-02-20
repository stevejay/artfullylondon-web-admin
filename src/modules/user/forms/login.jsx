import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'

import Divider from '_src/shared/components/divider'
import Form from '_src/shared/components/form'
import FormRow from '_src/shared/components/form/row'
import FormButtons from '_src/shared/components/form/buttons'
import TextField from '_src/shared/components/text/field'
import FormError from '_src/shared/components/form/error'
import * as userConstants from '../constants'

export const LoginForm = ({ submitting, handleSubmit, constraint, error }) => (
  <Form onSubmit={handleSubmit}>
    <FormError error={error} />
    <FormRow>
      <Field
        label='Username'
        name='username'
        component={TextField}
        autos={false}
        autoFocus
        forceSingleLine
        remainingChars={false}
        maxLength={constraint.username.length.maximum}
      />
    </FormRow>
    <FormRow style={{ marginBottom: 0 }}>
      <Field
        label='Password'
        name='password'
        component={TextField}
        password
        autos={false}
        remainingChars={false}
        maxLength={constraint.password.length.maximum}
      />
    </FormRow>
    <Divider />
    <FormButtons submitting={submitting} submitLabel='Submit' />
  </Form>
)

LoginForm.propTypes = {
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  constraint: PropTypes.object.isRequired,
  error: PropTypes.string,
  initialUsername: PropTypes.string,
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default connect(
  /* istanbul ignore next */
  (_, ownProps) => ({
    initialValues: {
      username: ownProps.initialUsername || '',
      password: ''
    }
  })
)(reduxForm({ form: userConstants.LOGIN_FORM_NAME })(LoginForm))
