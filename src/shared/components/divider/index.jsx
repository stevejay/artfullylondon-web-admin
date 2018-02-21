import React from 'react'
import PropTypes from 'prop-types'

import ShouldNeverUpdateComponent
  from '_src/shared/components/base-class/should-never-update'
import './index.scss'

class Divider extends ShouldNeverUpdateComponent {
  render () {
    const { type, ...rest } = this.props
    return <div role='presentation' {...rest} styleName={type} />
  }
}

Divider.propTypes = {
  type: PropTypes.oneOf(['basic', 'hidden', 'threedee'])
}

Divider.defaultProps = {
  type: 'basic'
}

export default Divider
