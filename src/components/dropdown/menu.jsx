import React from 'react'
import PropTypes from 'prop-types'

import DropdownMenuItem from '_src/components/dropdown/menu-item'
import './menu.scss'

const DropdownMenu = ({
  className,
  items,
  selectedIndex,
  compact,
  onMouseEnter,
  onClick
}) => (
  <ul
    role='menu'
    className={className}
    styleName={`menu${compact ? '-compact' : ''}`}
  >
    {items.map((item, index) => (
      <li key={index}>
        <DropdownMenuItem
          item={item}
          index={index}
          selected={index === selectedIndex}
          compact={compact}
          onMouseEnter={onMouseEnter}
          onClick={onClick}
        />
      </li>
    ))}
  </ul>
)

DropdownMenu.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array.isRequired,
  selectedIndex: PropTypes.number,
  compact: PropTypes.bool,
  onMouseEnter: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
}

export default DropdownMenu
