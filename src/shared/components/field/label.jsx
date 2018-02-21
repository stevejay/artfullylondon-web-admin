import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { Overlay } from 'react-overlays'

import FadeTransition from '_src/shared/components/transition/fade'
import './label.scss'

class Label extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      showHelp: false,
      ignoreHide: false // see handleHide for what this is
    }
  }
  handleMounted = ref => {
    /* istanbul ignore next */
    this._label = ref
  }
  shouldComponentUpdate (nextProps) {
    return (
      nextProps.error !== this.props.error ||
      nextProps.disabled !== this.props.disabled
    )
  }
  getTarget = () => {
    /* istanbul ignore next */
    return ReactDOM.findDOMNode(this._label)
  }
  handleClick = () => {
    this.setState({ showHelp: true, ignoreHide: true })
  }
  handleHide = () => {
    // hack to deal with Overlay issue:
    // https://github.com/react-bootstrap/react-overlays/issues/64

    if (this.state.ignoreHide) {
      this.setState({ ignoreHide: false })
    } else {
      this.setState({ showHelp: false })
    }
  }
  render () {
    const {
      children,
      tooltip,
      htmlFor,
      error,
      required,
      disabled,
      ...rest
    } = this.props

    const { showHelp } = this.state

    let styleName = disabled ? 'disabled' : required ? 'required' : 'basic'
    styleName = error && !disabled ? styleName + '-error' : styleName

    return (
      <div styleName={styleName}>
        <label
          ref={this.handleMounted}
          {...rest}
          htmlFor={htmlFor}
          styleName={tooltip ? 'has-tooltip' : ''}
          onClick={this.handleClick}
        >
          {children}
        </label>
        {!!tooltip &&
          <Overlay
            show={showHelp}
            onHide={this.handleHide}
            placement='bottom'
            container={this}
            rootClose
            target={this.getTarget}
            transition={FadeTransition}
          >
            <div styleName='tooltip'>{tooltip}</div>
          </Overlay>}
      </div>
    )
  }
}

Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  children: PropTypes.any,
  tooltip: PropTypes.any,
  error: PropTypes.any,
  required: PropTypes.bool,
  disabled: PropTypes.bool
}

export default Label