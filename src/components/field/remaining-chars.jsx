import React from 'react'
import PropTypes from 'prop-types'
import './remaining-chars.scss'

class RemainingChars extends React.Component {
  shouldComponentUpdate (nextProps) {
    return (
      nextProps.active !== this.props.active ||
      nextProps.value !== this.props.value
    )
  }
  render () {
    const { active, value, maxLength } = this.props

    if (!active) {
      return null
    }

    const remainingChars = Math.max(maxLength - value.length, 0)

    return (
      <div styleName='container'>
        {remainingChars} {remainingChars === 1 ? 'char' : 'chars'}
      </div>
    )
  }
}

RemainingChars.propTypes = {
  active: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  maxLength: PropTypes.number.isRequired
}

export default RemainingChars
