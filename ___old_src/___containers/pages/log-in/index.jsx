import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import ThumbsUp from 'react-icons/lib/fa/thumbs-o-up'
import Message from '_src/components/message'
import FormSection from '_src/components/form/section'
import FormBorder from '_src/components/form/border'
import { AUTH_STATE_LOGGED_IN, ALLOWED_AUTH_STATES } from '_src/constants/auth'
import { logIn } from '_src/actions/auth'
import LogInForm from '_src/containers/forms/log-in'
import { logInConstraint } from '_src/constants/auth-constraints'
import './index.scss'

const LogIn = ({ authState }) => {
  const loggedIn = authState === AUTH_STATE_LOGGED_IN

  if (loggedIn) {
    return (
      <Message icon={ThumbsUp} title='You are already logged in'>
        <span styleName='message-content'>
          <Link to='/'>Click here</Link> to
          go to the home page.
        </span>
      </Message>
    )
  }

  return (
    <FormSection type='narrow' styleName='container'>
      <FormBorder title='Log In'>
        <LogInForm
          onSubmit={this.props.logIn}
          initialUsername={this.props.initialUsername}
          constraint={logInConstraint}
        />
      </FormBorder>
    </FormSection>
  )
}

LogIn.propTypes = {
  authState: PropTypes.oneOf(ALLOWED_AUTH_STATES).isRequired,
  initialUsername: PropTypes.string,
  location: PropTypes.object.isRequired,
  logIn: PropTypes.func.isRequired
}

export default connect(
  state => ({
    authState: state.auth.state,
    initialUsername: state.auth.username
  }),
  dispatch => ({
    logIn: bindActionCreators(logIn, dispatch)
  })
)(LogIn)
