import React from 'react'
import PropTypes from 'prop-types'

import './border.scss'

const FormBorder = ({ title, children, ...rest }) => (
  <div {...rest} styleName='border'>
    <h1 styleName='header'>
      {title}
    </h1>
    <div styleName='content'>
      {children}
    </div>
  </div>
)

FormBorder.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired
}

export default FormBorder
