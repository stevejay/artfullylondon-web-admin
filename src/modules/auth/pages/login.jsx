import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import FormSection from '_src/components/form/section'
import FormBorder from '_src/components/form/border'
import LoginForm from '_src/modules/auth/forms/login'
import * as authConstraints from '_src/constants/auth-constraints'
import * as authActions from '_src/store/actions/auth'
import './login.scss'

export class LoginPage extends React.Component {
  handleSubmit = payload => {
    this.props.dispatch(authActions.logIn(payload))
  }
  render () {
    const { initialUsername } = this.props

    return (
      <FormSection type='narrow' styleName='form-section'>
        <FormBorder title='Log In'>
          <LoginForm
            onSubmit={this.handleSubmit}
            initialUsername={initialUsername}
            constraint={authConstraints.logInConstraint}
          />
        </FormBorder>
      </FormSection>
    )
  }
}

LoginPage.propTypes = {
  initialUsername: PropTypes.string,
  dispatch: PropTypes.func.isRequired
}

export default connect(
  /* istanbul ignore next */
  state => ({ initialUsername: state.auth.username })
)(LoginPage)
