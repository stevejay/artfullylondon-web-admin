import React from 'react'
import PropTypes from 'prop-types'

import DropdownMenuLink from '_src/modules/header/components/dropdown/menu-link'
import './menu.scss'

const DropdownMenu = ({
  className,
  style,
  items,
  selectedIndex,
  onMouseDown,
  onMouseEnter,
  onClick
}) => (
  <ul className={className} role='menu' styleName='menu' style={style}>
    {items.map((x, index) => (
      <li key={x.label}>
        <DropdownMenuLink
          label={x.label}
          index={index}
          to={x.path}
          selected={index === selectedIndex}
          onMouseDown={onMouseDown}
          onMouseEnter={onMouseEnter}
          onClick={onClick}
        />
      </li>
    ))}
  </ul>
)

DropdownMenu.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  items: PropTypes.array.isRequired,
  selectedIndex: PropTypes.number,
  onMouseDown: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
}

export default DropdownMenu
