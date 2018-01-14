import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { Overlay } from 'react-overlays'

import { ARROW_UP_KEYCODE, ARROW_DOWN_KEYCODE } from '_src/constants/browser'
import MenuLink from '_src/modules/header/components/menu-link'
import Transition from '_src/modules/header/components/transition'
import HeaderButton from '_src/modules/header/components/button'
import './menu.scss'

class Menu extends React.Component {
  constructor (props) {
    super(props)
    this.state = { isOpen: false, selectedIndex: null }
  }
  handleContainerMounted = ref => {
    this._container = ref
  }
  handleHeaderButtonMounted = ref => {
    this._headerButton = ref
  }
  handleItemMouseDown = event => {
    // Prevent blurring of the button from stopping the router Link
    // component from performing the route change.
    event.preventDefault()
  }
  handleItemMouseEnter = index => {
    if (index !== this.state.selectedIndex) {
      this.setState({ selectedIndex: index })
    }
  }
  handleItemClick = () => {
    this._closeMenu()
  }
  handleHeaderClick = () => {
    if (!this.state.isOpen) {
      this._openMenu()
    }
  }
  handleKeyPress = event => {
    if (event.charCode !== 13) {
      return
    }

    const { selectedIndex } = this.state

    if (selectedIndex === null) {
      return
    }

    const to = this.props.items[selectedIndex].path
    event.preventDefault()

    this.setState({ isOpen: false, selectedIndex: null }, () =>
      this.props.history.push(to)
    )
  }
  handleKeyDown = event => {
    const { keyCode } = event

    if (!(keyCode === ARROW_UP_KEYCODE || keyCode === ARROW_DOWN_KEYCODE)) {
      return
    }

    event.preventDefault()

    const { items } = this.props
    const { isOpen, selectedIndex } = this.state

    if (keyCode === ARROW_UP_KEYCODE) {
      if (selectedIndex > 0) {
        this.setState({ selectedIndex: selectedIndex - 1 })
      } else if (selectedIndex === 0) {
        this.setState({ selectedIndex: null })
      }
    } else if (keyCode === ARROW_DOWN_KEYCODE) {
      if (selectedIndex === null) {
        if (!isOpen) {
          this._openMenu(0)
        } else {
          this.setState({ selectedIndex: 0 })
        }
      } else if (selectedIndex < items.length - 1) {
        this.setState({ selectedIndex: selectedIndex + 1 })
      }
    }
  }
  handleHeaderFocus = () => {
    if (!this.state.isOpen) {
      this._openMenu()
    }
  }
  handleHeaderBlur = () => {
    if (!this._componentHasFocus() && this.state.isOpen) {
      this._closeMenu()
    }
  }
  handleHide = () => {
    // NO-OP
  }
  _componentHasFocus () {
    return document.activeElement === this._getOverlayTarget()
  }
  _getOverlayTarget = () => {
    return ReactDOM.findDOMNode(this._headerButton)
  }
  _closeMenu () {
    this.setState({ isOpen: false, selectedIndex: null })
  }
  _openMenu (selectedIndex = null) {
    this.setState({ isOpen: true, selectedIndex })
  }
  render () {
    const { label, items } = this.props
    const { isOpen, selectedIndex } = this.state

    return (
      <div styleName='container' ref={this.handleContainerMounted}>
        <HeaderButton
          ref={this.handleHeaderButtonMounted}
          label={label}
          onKeyDown={this.handleKeyDown}
          onKeyPress={this.handleKeyPress}
          onFocus={this.handleHeaderFocus}
          onBlur={this.handleHeaderBlur}
          onClick={this.handleHeaderClick}
          ariaHaspopup
        />
        {
          <Overlay
            show={isOpen}
            placement='bottom'
            rootClose
            shouldUpdatePosition
            container={this}
            target={this._getOverlayTarget}
            transition={Transition}
            onHide={this.handleHide}
          >
            <ul role='menu' styleName='menu'>
              {items.map((x, index) => (
                <li key={x.label}>
                  <MenuLink
                    label={x.label}
                    index={index}
                    to={x.path}
                    selected={index === selectedIndex}
                    onMouseDown={this.handleItemMouseDown}
                    onMouseEnter={this.handleItemMouseEnter}
                    onClick={this.handleItemClick}
                  />
                </li>
              ))}
            </ul>
          </Overlay>
        }
      </div>
    )
  }
}

Menu.propTypes = {
  label: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired
    })
  ).isRequired,
  history: PropTypes.object.isRequired
}

export default Menu
