import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'
import Divider from '_src/components/divider'
import Form from '_src/components/form'
import FormRow from '_src/components/form/row'
import FormButtons from '_src/components/form/buttons'
import TextField from '_src/components/text/field'
import FormError from '_src/components/form/error'
import { LOGIN_FORM_NAME } from '_src/constants/form'
import CheckboxBasicField from '_src/components/checkbox/basic-field'

export const LogInForm = ({ submitting, handleSubmit, constraint, error }) => (
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
    <FormRow>
      <Field
        label={
          <span>
            I accept the
            {' '}
            <Link to='/terms' target='_blank' rel='noopener'>
              Terms of Service
            </Link>
          </span>
        }
        name='acceptedTerms'
        component={CheckboxBasicField}
      />
    </FormRow>
    <Divider />
    <FormButtons submitting={submitting} submitLabel='Submit' />
  </Form>
)

LogInForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  constraint: PropTypes.object.isRequired,
  error: PropTypes.string
}

export default connect((_, ownProps) => ({
  initialValues: {
    username: ownProps.initialUsername || '',
    password: '',
    acceptedTerms: false
  }
}))(reduxForm({ form: LOGIN_FORM_NAME })(LogInForm))
