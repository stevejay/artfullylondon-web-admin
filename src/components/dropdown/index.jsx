import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { Overlay } from 'react-overlays'
import _ from 'lodash'
import document from 'global/document'

import DropdownTransition from '_src//components/dropdown/transition'
import DropdownButton from '_src/components/dropdown/button'
import DropdownMenu from '_src/components/dropdown/menu'
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
  handleItemMouseEnter = index => {
    if (index !== this.state.selectedIndex) {
      this.setState({ selectedIndex: index })
    }
  }
  handleItemClick = index => {
    this._closeMenu()
    this.props.onChange(this.props.items[index].value)
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

    this.setState({ isOpen: false, selectedIndex: null }, () =>
      this.props.onChange(this.props.items[selectedIndex].value)
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
  _closeMenu = () => {
    this.setState({ isOpen: false, selectedIndex: null })
  }
  _openMenu (selectedIndex = null) {
    // TODO problem here of not being able to open the dropdown with
    // a mouse click and then switch to navigating the options with
    // up/down arrows. It _doesn't_ work to give the dropdown button focus.
    this.setState({ isOpen: true, selectedIndex })
  }
  render () {
    const { value, items, compact, className } = this.props
    const { isOpen, selectedIndex } = this.state

    return (
      <div
        styleName='container'
        className={className}
        ref={this.handleContainerMounted}
      >
        <DropdownButton
          ref={this.handleHeaderButtonMounted}
          label={value} // TODO change this
          compact={compact}
          dropdownIsOpen={isOpen}
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
          onHide={this._closeMenu}
        >
          <DropdownMenu
            items={items}
            selectedIndex={selectedIndex}
            compact={compact}
            onMouseEnter={this.handleItemMouseEnter}
            onClick={this.handleItemClick}
          />
        </Overlay>
      </div>
    )
  }
}

Dropdown.propTypes = {
  value: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  compact: PropTypes.bool
}

export default Dropdown
