import React from 'react'
import PropTypes from 'prop-types'
import './tag-facet.m.scss'

class TagFacet extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    const { type, children, ...rest } = this.props
    return <span {...rest} styleName={'tag-' + type}>{children}</span>
  }
}

TagFacet.propTypes = {
  type: PropTypes.oneOf(['default', 'error']),
  children: PropTypes.any.isRequired
}

TagFacet.defaultProps = {
  type: 'default'
}

export default TagFacet
