import React from 'react'
import PropTypes from 'prop-types'

import Expander from '_src/components/expander'
import MenuLink from '_src/modules/nav/components/sidenav/menu-link'
import './menu.scss'

class Menu extends React.Component {
  shouldComponentUpdate (nextProps) {
    return nextProps.idOfOpenMenu !== this.props.idOfOpenMenu
  }
  render () {
    const {
      id,
      label,
      items,
      idOfOpenMenu,
      onLinkClick,
      onExpanderChange
    } = this.props

    const isOpen = idOfOpenMenu === id

    return (
      <Expander
        id={id}
        headerText={label}
        open={isOpen}
        onExpanderChange={onExpanderChange}
      >
        <ul styleName='menu' role='group'>
          {items.map(item => (
            <li key={item.label} styleName='link' role='treeitem'>
              <MenuLink
                path={item.path}
                label={item.label}
                onClick={onLinkClick}
              />
            </li>
          ))}
        </ul>
      </Expander>
    )
  }
}

Menu.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onExpanderChange: PropTypes.func.isRequired,
  onLinkClick: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired
    })
  ).isRequired,
  idOfOpenMenu: PropTypes.string
}

export default Menu
