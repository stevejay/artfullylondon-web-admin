import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import ShouldNeverUpdateComponent
  from '_src/shared/components/base-class/should-never-update'
import './sidenav-menu-link.scss'

class SidenavMenuLink extends ShouldNeverUpdateComponent {
  render () {
    const { path, label, onClick } = this.props
    return <Link to={path} styleName='link' onClick={onClick}>{label}</Link>
  }
}

SidenavMenuLink.propTypes = {
  path: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default SidenavMenuLink
