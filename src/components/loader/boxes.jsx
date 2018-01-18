import React from 'react'
import PropTypes from 'prop-types'

import './boxes.scss'

const TYPE_DEFAULT = 'default'
const SIZE_LARGE = 'large'

class BoxesLoader extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    const { size, type, className } = this.props

    return (
      <div styleName='container'>
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
