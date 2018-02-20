import React from 'react'
import PropTypes from 'prop-types'

import './sections-container.scss'

const SectionsContainer = ({ className, children }) => (
  <div className={className} styleName='container'>{children}</div>
)

SectionsContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any
}

export default SectionsContainer
