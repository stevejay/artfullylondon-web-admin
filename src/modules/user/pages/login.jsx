import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import FormSection from '_src/components/form/section'
import FormBorder from '_src/components/form/border'
import LoginForm from '../forms/login'
import * as userConstants from '../constants'
import * as userActions from '../actions'
import { selectors } from '../reducers'
import './login.scss'

export class LoginPage extends React.Component {
  handleSubmit = payload => {
    this.props.dispatch(userActions.logIn(payload))
  }
  render () {
    const { initialUsername } = this.props

    return (
      <FormSection type='narrow' styleName='form-section'>
        <FormBorder title='Log In'>
          <LoginForm
            onSubmit={this.handleSubmit}
            initialUsername={initialUsername}
            constraint={userConstants.logInConstraint}
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
  state => ({ initialUsername: selectors.username(state) })
)(LoginPage)
