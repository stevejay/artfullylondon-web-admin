import React from 'react'
import PropTypes from 'prop-types'

import './index.scss'

const Form = ({ children, onSubmit, className, ...rest }) => (
  <form {...rest} onSubmit={onSubmit} styleName='form' className={className}>
    {children}
  </form>
)

Form.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  onSubmit: PropTypes.func.isRequired
}

export default Form
