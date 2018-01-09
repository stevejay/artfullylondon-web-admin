import React from 'react'
import PropTypes from 'prop-types'
import CloseIcon from 'react-icons/lib/fa/close'
import Loader from '_src/components/loader'
import './tag.m.scss'

class Tag extends React.Component {
  shouldComponentUpdate (nextProps) {
    return (
      nextProps.value !== this.props.value ||
      nextProps.isBeingDeleted !== this.props.isBeingDeleted
    )
  }
  handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.props.onDelete(this.props.value.id)
    }
  }
  handleClick = () => {
    this.props.onDelete(this.props.value.id)
  }
  render () {
    const { value: { label }, isBeingDeleted } = this.props

    return (
      <div styleName='tag'>
        <span>{label}</span>
        {isBeingDeleted &&
          <div styleName='loader'>
            <Loader size='small' type='inverse' />
          </div>}
        {!isBeingDeleted &&
          <CloseIcon
            styleName='icon'
            tabIndex='0'
            onKeyPress={this.handleKeyPress}
            onClick={this.handleClick}
          />}
      </div>
    )
  }
}

Tag.propTypes = {
  value: PropTypes.shape({
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }).isRequired,
  isBeingDeleted: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default Tag
