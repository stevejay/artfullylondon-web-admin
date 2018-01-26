import React from 'react'
import PropTypes from 'prop-types'

import './row.scss'

const FormRow = ({ children, className, ...rest }) => (
  <div {...rest} className={className} styleName='container'>
    {children}
  </div>
)

FormRow.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string
}

export default FormRow
