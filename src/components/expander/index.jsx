import React from 'react'
import PropTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import DownIcon from 'react-icons/lib/fa/angle-down'
import CircleIcon from 'react-icons/lib/fa/circle'
import Pusher from '_src/components/pusher'
import { ARROW_UP_KEYCODE, ARROW_DOWN_KEYCODE } from '_src/constants/browser'
import './index.scss'

class Expander extends React.Component {
  handleExpanderChange = event => {
    event.preventDefault()
    this.props.onExpanderChange(this.props.id)
  }
  handleKeyDown = event => {
    const { open } = this.props
    const { keyCode } = event

    if (!(keyCode === ARROW_UP_KEYCODE || keyCode === ARROW_DOWN_KEYCODE)) {
      return
    }

    if (
      (keyCode === ARROW_UP_KEYCODE && open) ||
      (keyCode === ARROW_DOWN_KEYCODE && !open)
    ) {
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
        <div
          styleName='header-container'
          onClick={this.handleExpanderChange}
          onKeyDown={this.handleKeyDown}
          tabIndex='0'
          aria-expanded={open}
        >
          <h6 styleName='header'>{headerText}</h6>
          {!!interestingContent &&
            <CircleIcon styleName={`indicator-${open ? 'open' : 'closed'}`} />}
          <Pusher />
          <DownIcon styleName={`arrow-${open ? 'up' : 'down'}`} />
        </div>
        <TransitionGroup>
          <CSSTransition classNames='expander' timeout={250}>
            <div key='children' in={open} styleName='children'>{children}</div>
          </CSSTransition>
        </TransitionGroup>
      </div>
    )
  }
}

Expander.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  headerText: PropTypes.string.isRequired,
  children: PropTypes.any,
  open: PropTypes.bool.isRequired,
  onExpanderChange: PropTypes.func.isRequired,
  interestingContent: PropTypes.bool
}

export default Expander
