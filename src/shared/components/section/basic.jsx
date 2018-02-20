import React from 'react'
import PropTypes from 'prop-types'

import './basic.scss'

const BasicSection = ({ children, className }) => (
  <section className={className} styleName='section'>{children}</section>
)

BasicSection.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any
}

export default BasicSection
