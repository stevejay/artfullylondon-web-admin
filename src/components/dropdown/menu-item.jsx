import React from 'react'
import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom'

import './menu-item.scss'

// handleItemMouseDown = event => {
//   // Prevent blurring of the button from stopping the router Link
//   // component from performing the route change.
//   event.preventDefault()
// }

class DropdownMenuItem extends React.Component {
  shouldComponentUpdate (nextProps) {
    return nextProps.selected !== this.props.selected
  }
  handleMouseEnter = () => {
    this.props.onMouseEnter(this.props.index)
  }
  handleClick = () => {
    this.props.onClick(this.props.index)
  }
  render () {
    const { item, selected, compact } = this.props

    return (
      <button
        type='button'
        role='menuitem'
        styleName={`menu-item${compact ? '-compact' : ''}${selected ? '-selected' : ''}`}
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
        tabIndex='-1'
      >
        {item.label}
      </button>
    )
    // <Link
    //   role='menuitem'
    //   styleName={styleName}
    //   to={to}
    //   onMouseDown={onMouseDown}
    //   onMouseEnter={this.handleMouseEnter}
    //   onClick={onClick}
    //   tabIndex='-1'
    // >
    //   {label}
    // </Link>
  }
}

DropdownMenuItem.propTypes = {
  item: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  compact: PropTypes.bool,
  onMouseEnter: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
}

export default DropdownMenuItem
