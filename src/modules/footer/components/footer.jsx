import React from 'react'
import PropTypes from 'prop-types'
import log from 'loglevel'
import { withState } from 'recompose'

import * as timeLib from '_src/lib/time'
import './footer.scss'

export class Footer extends React.PureComponent {
  componentDidCatch (error, info) {
    this.props.setHasError(true)
    log.error(error, info.componentStack)
  }
  render () {
    if (this.props.hasError) {
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

Footer.propTypes = {
  hasError: PropTypes.bool.isRequired,
  setHasError: PropTypes.func.isRequired
}

export default withState('hasError', 'setHasError', false)(Footer)
