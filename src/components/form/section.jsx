import React from 'react'
import PropTypes from 'prop-types'
import './section.scss'

const FormSection = ({ type, className, children, ...rest }) => (
  <section className={className} styleName={`container-${type}`}>
    {children}
  </section>
)

FormSection.propTypes = {
  type: PropTypes.oneOf(['narrow', 'wide', 'verywide', 'full']).isRequired,
  className: PropTypes.string,
  children: PropTypes.any.isRequired
}

export default FormSection
