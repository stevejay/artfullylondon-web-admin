import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './menu-link.scss'

class MenuLink extends React.Component {
  shouldComponentUpdate (nextProps) {
    return nextProps.selected !== this.props.selected
  }
  handleMouseEnter = () => {
    this.props.onMouseEnter(this.props.index)
  }
  render () {
    const { to, label, selected, onMouseDown, onClick } = this.props
    const styleName = `link${selected ? '-selected' : ''}`

    return (
      <Link
        role='menuitem'
        styleName={styleName}
        to={to}
        onMouseDown={onMouseDown}
        onMouseEnter={this.handleMouseEnter}
        onClick={onClick}
        tabIndex='-1'
      >
        {label}
      </Link>
    )
  }
}

MenuLink.propTypes = {
  label: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  to: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
}

export default MenuLink
