import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { Overlay } from 'react-overlays'
import _ from 'lodash'

import DropdownTransition
  from '_src/modules/header/components/dropdown/transition'
import DropdownButton from '_src/modules/header/components/dropdown/button'
import DropdownMenu from '_src/modules/header/components/dropdown/menu'
import DropdownMenuLink from '_src/modules/header/components/dropdown/menu-link'
import * as browserConstants from '_src/constants/browser'
import './index.scss'

class Dropdown extends React.Component {
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
  handleButtonClick = () => {
    if (!this.state.isOpen) {
      this._openMenu()
    }
  }
  handleKeyPress = event => {
    if (event.charCode !== browserConstants.ENTER_CHARCODE) {
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

    if (
      !(keyCode === browserConstants.ARROW_UP_KEYCODE ||
        keyCode === browserConstants.ARROW_DOWN_KEYCODE)
    ) {
      return
    }

    event.preventDefault()

    const { items } = this.props
    const { isOpen, selectedIndex } = this.state

    if (keyCode === browserConstants.ARROW_UP_KEYCODE) {
      if (selectedIndex > 0) {
        this.setState({ selectedIndex: selectedIndex - 1 })
      } else if (selectedIndex === 0) {
        this.setState({ selectedIndex: null })
      }
    } else if (keyCode === browserConstants.ARROW_DOWN_KEYCODE) {
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
  handleFocus = () => {
    if (!this.state.isOpen) {
      this._openMenu()
    }
  }
  handleBlur = () => {
    if (!this._componentHasFocus() && this.state.isOpen) {
      this._closeMenu()
    }
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
        <DropdownButton
          ref={this.handleHeaderButtonMounted}
          label={label}
          onKeyDown={this.handleKeyDown}
          onKeyPress={this.handleKeyPress}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onClick={this.handleButtonClick}
          ariaHaspopup
        />
        <Overlay
          show={isOpen}
          placement='bottom'
          rootClose
          shouldUpdatePosition
          container={this}
          target={this._getOverlayTarget}
          transition={DropdownTransition}
          onHide={_.noop}
        >
          <DropdownMenu
            items={items}
            selectedIndex={selectedIndex}
            onMouseDown={this.handleItemMouseDown}
            onMouseEnter={this.handleItemMouseEnter}
            onClick={this.handleItemClick}
          />
        </Overlay>
      </div>
    )
  }
}

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired
    })
  ).isRequired,
  history: PropTypes.object.isRequired
}

export default Dropdown
