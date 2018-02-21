import React from 'react'
import PropTypes from 'prop-types'

import ShouldNeverUpdateComponent
  from '_src/shared/components/base-class/should-never-update'
import './section-header.scss'

class FormSectionHeader extends ShouldNeverUpdateComponent {
  render () {
    return <h2 styleName='h2'>{this.props.children}</h2>
  }
}

FormSectionHeader.propTypes = {
  children: PropTypes.any.isRequired
}

export default FormSectionHeader
