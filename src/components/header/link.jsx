import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './Link.scss'

const HeaderLink = ({ label, to }) => (
  <Link to={to} styleName='link' role='menuitem'>
    {label}
  </Link>
)

HeaderLink.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
}

export default HeaderLink
