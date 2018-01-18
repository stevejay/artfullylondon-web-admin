import React from 'react'
import PropTypes from 'prop-types'
import './text.scss'

const TextSection = ({ className, type, children }) => (
  <section className={className} styleName={'section-' + type}>
    {children}
  </section>
)

/* istanbul ignore next */
TextSection.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(['default', 'smallprint']).isRequired,
  children: PropTypes.any
}

/* istanbul ignore next */
TextSection.defaultProps = {
  type: 'default'
}

export default TextSection
