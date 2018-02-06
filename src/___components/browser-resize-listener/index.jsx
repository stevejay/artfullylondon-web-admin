import React from 'react'
import PropTypes from 'prop-types'
import * as browser from '_src/lib/browser'

const RESIZE_EVENT = 'resize'

// Note: debouncing of resize events is handled at the saga level.
class BrowserResizeListener extends React.Component {
  componentDidMount () {
    browser.addWindowEventListener(RESIZE_EVENT, this.handleWindowResize)
  }
  componentWillUnmount () {
    browser.removeWindowEventListener(RESIZE_EVENT, this.handleWindowResize)
  }
  handleWindowResize = () => {
    this.props.onWindowResize(browser.getWindowInnerWidth())
  }
  render () {
    return null
  }
}

BrowserResizeListener.propTypes = {
  onWindowResize: PropTypes.func.isRequired
}

export default BrowserResizeListener
