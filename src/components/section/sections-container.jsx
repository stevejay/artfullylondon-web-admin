import React from 'react'
import PropTypes from 'prop-types'

import './sections-container.scss'

const SectionsContainer = ({ className, children }) => (
  <div className={className} styleName='container'>{children}</div>
)

/* istanbul ignore next */
SectionsContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any
}

export default SectionsContainer
