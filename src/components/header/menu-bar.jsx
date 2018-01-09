import React from 'react'
import PropTypes from 'prop-types'
import './menu-bar.m.scss'

const MenuBar = props => (
  <div styleName='container' role='menubar'>
    {props.children}
  </div>
)

MenuBar.propTypes = {
  children: PropTypes.any.isRequired
}

export default MenuBar
