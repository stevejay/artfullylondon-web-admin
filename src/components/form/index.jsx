import React from 'react'
import PropTypes from 'prop-types'

import './index.m.scss'

const Form = ({ children, onSubmit, ...rest }) =>
  <form {...rest} onSubmit={onSubmit} styleName='form'>
    {children}
  </form>

Form.propTypes = {
  children: PropTypes.any.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default Form
