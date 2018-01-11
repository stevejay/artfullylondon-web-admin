import React from 'react'
import PropTypes from 'prop-types'

import './index.scss'

const TYPE_DEFAULT = 'default'
const TYPE_INVERSE = 'inverse'

class Loader extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    const { size, type, ...rest } = this.props

    return (
      <div
        {...rest}
        role='alert'
        aria-busy
        styleName={`${size}-${type}`}
      />
    )
  }
}

Loader.propTypes = {
  size: PropTypes.oneOf([
    'tiny',
    'small',
    'medium',
    'large',
    'massive',
    'modal'
  ]).isRequired,
  type: PropTypes.oneOf([TYPE_DEFAULT, TYPE_INVERSE])
}

Loader.defaultProps = {
  type: TYPE_DEFAULT
}

export default Loader
