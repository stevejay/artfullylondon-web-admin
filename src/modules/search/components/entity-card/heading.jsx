import React from 'react'
import PropTypes from 'prop-types'

import ShouldNeverUpdateComponent
  from '_src/shared/components/base-class/should-never-update'
import './heading.scss'

class Heading extends ShouldNeverUpdateComponent {
  render () {
    const { id, children, ...rest } = this.props
    return <h3 {...rest} id={id} styleName='heading'>{children}</h3>
  }
}

Heading.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired
}

export default Heading
