import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'

class Divider extends React.Component {
  shouldComponentUpdate () {
    return false
  }
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
