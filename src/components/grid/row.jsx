import React from 'react'
import PropTypes from 'prop-types'
import Close from 'react-icons/lib/fa/close'

import * as browserConstants from '_src/constants/browser'
import './row.scss'

class GridRow extends React.Component {
  handleKeyPress = event => {
    if (event.charCode === browserConstants.ENTER_CHARCODE) {
      this.props.onDelete(this.props.id)
    }
  }
  handleClick = () => {
    const { id, onDelete } = this.props

    if (onDelete) {
      onDelete(id)
    }
  }
  render () {
    const { onDelete, children } = this.props

    return (
      <div styleName='container'>
        <div styleName='content'>
          {children}
        </div>
        {!!onDelete &&
          <Close
            tabIndex='0'
            styleName='icon'
            onKeyPress={this.handleKeyPress}
            onClick={this.handleClick}
          />}
      </div>
    )
  }
}

GridRow.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  onDelete: PropTypes.func
}

export default GridRow
