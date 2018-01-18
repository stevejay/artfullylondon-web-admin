import React from 'react'
import PropTypes from 'prop-types'
import './text.scss'

const TextSection = ({ className, type, children }) => (
  <section className={className} styleName={'section-' + type}>
    {children}
  </section>
)

TextSection.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(['default', 'smallprint']).isRequired,
  children: PropTypes.any
}

TextSection.defaultProps = {
  type: 'default'
}

export default TextSection
