import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './menu-link.m.scss'

class MenuLink extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    const { path, label, onClick } = this.props
    return <Link to={path} styleName='link' onClick={onClick}>{label}</Link>
  }
}

MenuLink.propTypes = {
  path: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default MenuLink
