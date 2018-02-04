import React from 'react'
import PropTypes from 'prop-types'

import './index.scss'

class RadioButton extends React.Component {
  shouldComponentUpdate (nextProps) {
    return nextProps.checked !== this.props.checked
  }
  handleChange = () => {
    this.props.onChange(this.props.value)
  }
  render () {
    const { checked, name, value, label } = this.props
    const containerStyleName = `container${checked ? '-checked' : ''}`

    return (
      <div styleName={containerStyleName}>
        <input
          styleName='input'
          checked={checked}
          tabIndex='0'
          id={value}
          type='radio'
          onChange={this.handleChange}
          name={name}
        />
        <label styleName='label' htmlFor={value}>
          <span>{label}</span>
        </label>
      </div>
    )
  }
}

RadioButton.propTypes = {
  checked: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default RadioButton
