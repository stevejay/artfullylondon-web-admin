import React from 'react'
import PropTypes from 'prop-types'

import ShouldNeverUpdateComponent
  from '_src/shared/components/base-class/should-never-update'
import './tag-facet.scss'

class TagFacet extends ShouldNeverUpdateComponent {
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
