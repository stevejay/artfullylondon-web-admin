import React from 'react'
import log from 'loglevel'

import * as timeLib from '_src/lib/time'
import './index.scss'

class Footer extends React.Component {
  constructor (props) {
    super(props)
    this.state = { hasError: false }
  }
  shouldComponentUpdate (nextProps, nextState) {
    return nextState.hasError !== this.state.hasError
  }
  componentDidCatch (error, info) {
    this.setState({ hasError: true })
    log.error(error, info.componentStack)
  }
  render () {
    if (this.state.hasError) {
      return null
    }

    return (
      <ul role='presentation' styleName='item-container'>
        <li styleName='item'>
          © {timeLib.getYearNow()} Middle Engine Software Ltd
        </li>
        <li styleName='item'>Version {process.env.WEBSITE_VERSION}</li>
      </ul>
    )
  }
}

export default Footer
