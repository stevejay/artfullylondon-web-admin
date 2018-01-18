import React from 'react'
import PropTypes from 'prop-types'

import './alt-background.scss'

const AltBackgroundSection = ({ className, children }) => (
  <div className={className} styleName='container'>{children}</div>
)

/* istanbul ignore next */
AltBackgroundSection.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any
}

export default AltBackgroundSection
