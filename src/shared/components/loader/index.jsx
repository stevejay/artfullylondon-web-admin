import React from 'react'
import PropTypes from 'prop-types'

import ShouldNeverUpdateComponent
  from '_src/shared/components/base-class/should-never-update'
import './index.scss'

const TYPE_DEFAULT = 'default'
const TYPE_INVERSE = 'inverse'

class Loader extends ShouldNeverUpdateComponent {
  render () {
    const { size, type, className } = this.props

    return (
      <div
        className={className}
        role='alert'
        aria-busy
        styleName={`${size}-${type}`}
      />
    )
  }
}

Loader.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(['tiny', 'small', 'medium', 'large', 'modal'])
    .isRequired,
  type: PropTypes.oneOf([TYPE_DEFAULT, TYPE_INVERSE])
}

Loader.defaultProps = {
  type: TYPE_DEFAULT
}

export default Loader
