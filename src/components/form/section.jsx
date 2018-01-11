import React from 'react'
import PropTypes from 'prop-types'
import './section.scss'

const FormSection = ({ type, children, ...rest }) => (
  <section {...rest} styleName={`container-${type}`}>{children}</section>
)

FormSection.propTypes = {
  type: PropTypes.oneOf(['narrow', 'wide', 'verywide', 'full']).isRequired,
  children: PropTypes.any.isRequired
}

export default FormSection
