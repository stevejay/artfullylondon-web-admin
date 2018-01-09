import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Checkmark from 'react-icons/lib/fa/check'
import './index.m.scss'

class Checkbox extends React.Component {
  constructor (props) {
    super(props)
    this.state = { id: _.uniqueId('checkbox_') }
  }
  shouldComponentUpdate (nextProps) {
    return (
      nextProps.checked !== this.props.checked ||
      nextProps.error !== this.props.error ||
      nextProps.touched !== this.props.touched
    )
  }
  render () {
    const { checked, children, onChange, error, touched, ...rest } = this.props

    const { id } = this.state
    const hasError = !!touched && !!error

    return (
      <div styleName={hasError ? 'container-error' : 'container'}>
        <input
          {...rest}
          id={id}
          styleName='checkbox'
          type='checkbox'
          checked={checked}
          onChange={onChange}
        />
        <label htmlFor={id} styleName='label'>
          {children}
        </label>
        {checked && <Checkmark styleName='checkmark' />}
      </div>
    )
  }
}

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  error: PropTypes.any,
  touched: PropTypes.any,
  children: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Checkbox
