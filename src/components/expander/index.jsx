import React from 'react'
import PropTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import DownIcon from 'react-icons/lib/fa/angle-down'
import CircleIcon from 'react-icons/lib/fa/circle'

import * as browserConstants from '_src/constants/browser'
import './index.scss'

class Expander extends React.Component {
  handleExpanderChange = event => {
    event.preventDefault()
    this.props.onExpanderChange(this.props.id)
  }
  handleKeyDown = event => {
    const { keyCode } = event
    const { open } = this.props

    const isArrowUp = keyCode === browserConstants.ARROW_UP_KEYCODE
    const isArrowDown = keyCode === browserConstants.ARROW_DOWN_KEYCODE

    if (!(isArrowUp || isArrowDown)) {
      return
    }

    if ((isArrowUp && open) || (isArrowDown && !open)) {
      this.handleExpanderChange(event)
    }
  }
  render () {
    const {
      headerText,
      children,
      open,
      interestingContent,
      onExpanderChange, // eslint-disable-line no-unused-vars
      ...rest
    } = this.props

    return (
      <div {...rest} styleName='container'>
        <button
          styleName='header-button'
          onClick={this.handleExpanderChange}
          onKeyDown={this.handleKeyDown}
          tabIndex='0'
          aria-expanded={open}
        >
          <h6 styleName='header-text'>{headerText}</h6>
          {interestingContent &&
            <CircleIcon styleName={`indicator-${open ? 'open' : 'closed'}`} />}
          <DownIcon styleName={`arrow-${open ? 'up' : 'down'}`} />
        </button>
        <TransitionGroup>
          {open &&
            <CSSTransition key='children' classNames='expander' timeout={250}>
              {children}
            </CSSTransition>}
        </TransitionGroup>
      </div>
    )
  }
}

/* istanbul ignore next */
Expander.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  headerText: PropTypes.string.isRequired,
  children: PropTypes.any,
  open: PropTypes.bool.isRequired,
  onExpanderChange: PropTypes.func.isRequired,
  interestingContent: PropTypes.bool
}

/* istanbul ignore next */
Expander.defaultProps = {
  interestingContent: false
}

export default Expander
