import React from 'react'
import PropTypes from 'prop-types'
import './menu-bar.scss'

const MenuBar = ({ children }) => (
  <div styleName='container' role='menubar'>
    {children}
  </div>
)

MenuBar.propTypes = {
  children: PropTypes.any.isRequired
}

export default MenuBar
