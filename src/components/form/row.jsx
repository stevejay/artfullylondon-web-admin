import React from 'react'
import PropTypes from 'prop-types'

import './row.m.scss'

const FormRow = ({ children, ...rest }) =>
  <div {...rest} styleName='container'>
    {children}
  </div>

FormRow.propTypes = {
  children: PropTypes.any.isRequired
}

export default FormRow
