import React from 'react'
import PropTypes from 'prop-types'
import log from 'loglevel'

import Error from '_src/components/error'
import './main.scss'

class PageMain extends React.Component {
  constructor (props) {
    super(props)
    this.state = { hasError: false }
  }
  componentDidCatch (error, info) {
    this.setState({ hasError: true })
    log.error(error, info.componentStack)
  }
  render () {
    const { className, children } = this.props
    const { hasError } = this.state
    const content = hasError ? <Error statusCode={500} /> : children || null
    return <main className={className} styleName='page-main'>{content}</main>
  }
}

/* istanbul ignore next */
PageMain.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any
}

export default PageMain
