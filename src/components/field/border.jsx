import React from 'react'
import PropTypes from 'prop-types'
import './border.scss'

const FieldBorder = ({ children, style }) => (
  <div styleName='container' style={style}>
    {children}
  </div>
)

FieldBorder.propTypes = {
  children: PropTypes.any.isRequired,
  style: PropTypes.object
}

export default FieldBorder
