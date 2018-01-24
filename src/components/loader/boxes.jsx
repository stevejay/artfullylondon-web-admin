import React from 'react'
import PropTypes from 'prop-types'
import window from 'global/window'

import './boxes.scss'

const TYPE_DEFAULT = 'default'
const SIZE_LARGE = 'large'
const DELAY_MS = 750

class BoxesLoader extends React.Component {
  constructor (props) {
    super(props)
    this.state = { visible: false }
    this.mounted = true

    this.timeout = window.setTimeout(
      () => this.mounted && this.setState({ visible: true }),
      DELAY_MS
    )
  }
  componentWillUnmount () {
    this.mounted = false
    this.timeout && window.clearTimeout(this.timeout)
  }
  shouldComponentUpdate (nextProps, nextState) {
    return nextState.visible !== this.state.visible
  }
  render () {
    const { size, type, className } = this.props
    const { visible } = this.state

    if (!visible) {
      return null
    }

    return (
      <div styleName='container' aria-busy role='alert'>
        <div
          className={className}
          role='alert'
          aria-busy
          styleName={`${size}-${type}`}
        >
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    )
  }
}

BoxesLoader.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf([SIZE_LARGE]),
  type: PropTypes.oneOf([TYPE_DEFAULT])
}

BoxesLoader.defaultProps = {
  size: SIZE_LARGE,
  type: TYPE_DEFAULT
}

export default BoxesLoader
