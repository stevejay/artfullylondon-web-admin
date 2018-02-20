import React from 'react'
import PropTypes from 'prop-types'

import ShouldNeverUpdateComponent
  from '_src/shared/components/base-class/should-never-update'
import './sub-heading.scss'

class SubHeading extends ShouldNeverUpdateComponent {
  render () {
    const { children, ...rest } = this.props
    return <h4 {...rest} styleName='sub-heading'>{children}</h4>
  }
}

SubHeading.propTypes = {
  children: PropTypes.any.isRequired
}

export default SubHeading
