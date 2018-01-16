import React from 'react'
import PropTypes from 'prop-types'

import MenuLink from '_src/modules/header/components/menu-link'
import './menu.scss'

const Menu = ({
  style,
  items,
  selectedIndex,
  onMouseDown,
  onMouseEnter,
  onClick
}) => (
  <ul role='menu' styleName='menu' style={style}>
    {items.map((x, index) => (
      <li key={x.label}>
        <MenuLink
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

Menu.propTypes = {
  style: PropTypes.object,
  items: PropTypes.array.isRequired,
  selectedIndex: PropTypes.number,
  onMouseDown: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Menu
