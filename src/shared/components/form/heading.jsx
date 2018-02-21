import React from 'react'
import PropTypes from 'prop-types'

import ShouldNeverUpdateComponent
  from '_src/shared/components/base-class/should-never-update'
import './heading.scss'

class FormHeading extends ShouldNeverUpdateComponent {
  render () {
    const { children, ...rest } = this.props
    return <h2 {...rest} styleName='heading'>{children}</h2>
  }
}

FormHeading.propTypes = {
  children: PropTypes.any.isRequired
}

export default FormHeading
