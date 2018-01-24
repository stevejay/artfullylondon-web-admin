import React from 'react'
import PropTypes from 'prop-types'
import './border.scss'

const FieldBorder = ({ children, className }) => (
  <div styleName='container' className={className}>
    {children}
  </div>
)

FieldBorder.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string
}

export default FieldBorder
