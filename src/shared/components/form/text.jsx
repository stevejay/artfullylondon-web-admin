import React from 'react'
import PropTypes from 'prop-types'

import ShouldNeverUpdateComponent
  from '_src/shared/components/base-class/should-never-update'
import './text.scss'

class FormText extends ShouldNeverUpdateComponent {
  render () {
    const { children, ...rest } = this.props
    return <div {...rest} styleName='container'>{children}</div>
  }
}

FormText.propTypes = {
  children: PropTypes.any
}

export default FormText
