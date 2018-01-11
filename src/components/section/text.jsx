import React from 'react'
import PropTypes from 'prop-types'
import './text.scss'

const TextSection = ({ type, children, ...rest }) => {
  return <section {...rest} styleName={'section-' + type}>{children}</section>
}

TextSection.propTypes = {
  type: PropTypes.oneOf(['default', 'smallprint']).isRequired,
  children: PropTypes.any
}

TextSection.defaultProps = {
  type: 'default'
}

export default TextSection
