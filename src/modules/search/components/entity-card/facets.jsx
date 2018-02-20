import React from 'react'
import PropTypes from 'prop-types'

import ShouldNeverUpdateComponent
  from '_src/shared/components/base-class/should-never-update'
import './facets.scss'

class Facets extends ShouldNeverUpdateComponent {
  render () {
    const { children, ...rest } = this.props
    return <div {...rest} styleName='facets'>{children}</div>
  }
}

Facets.propTypes = {
  children: PropTypes.any.isRequired
}

export default Facets
