import React from 'react'
import PropTypes from 'prop-types'

import ShouldNeverUpdateComponent
  from '_src/shared/components/base-class/should-never-update'
import './section-heading.scss'

class EntitySectionHeading extends ShouldNeverUpdateComponent {
  render () {
    return <h2 styleName='heading'>{this.props.children}</h2>
  }
}

EntitySectionHeading.propTypes = {
  children: PropTypes.any.isRequired
}

export default EntitySectionHeading
