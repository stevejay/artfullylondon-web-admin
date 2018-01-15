import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import FormSection from '_src/components/form/section'
import FormBorder from '_src/components/form/border'
import LoginForm from '_src/modules/auth/forms/login'
import * as authActions from '_src/actions/auth'
import * as authConstraints from '_src/constants/auth-constraints'
import './login.scss'

const LoginPage = ({ logIn, initialUsername }) => (
  <FormSection type='narrow' styleName='form-section'>
    <FormBorder title='Log In'>
      <LoginForm
        onSubmit={logIn}
        initialUsername={initialUsername}
        constraint={authConstraints.logInConstraint}
      />
    </FormBorder>
  </FormSection>
)

LoginPage.propTypes = {
  initialUsername: PropTypes.string,
  logIn: PropTypes.func.isRequired
}

export default connect(
  state => ({
    initialUsername: state.auth.username
  }),
  dispatch => ({
    logIn: bindActionCreators(authActions.logIn, dispatch)
  })
)(LoginPage)
