import React from 'react'
import { connect } from 'react-redux'
import ThumbsUp from 'react-icons/lib/fa/thumbs-o-up'
import { Link } from 'react-router-dom'
import Message from '_src/components/message'
import './index.m.scss'

class LogOut extends React.Component {
  render () {
    return (
      <Message icon={ThumbsUp} title='You have been logged out'>
        <span styleName='message-content'>
          <Link to='/log-in'>Click here</Link> to log back in.
        </span>
      </Message>
    )
  }
}

export default connect(_state => ({}))(LogOut)
