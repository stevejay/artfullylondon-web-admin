import React from 'react'
import PropTypes from 'prop-types'
import Close from 'react-icons/lib/fa/close'

import IconButton from '_src/shared/components/button/icon'
import './row.scss'

class GridRow extends React.Component {
  handleClick = () => {
    this.props.onDelete(this.props.id)
  }
  render () {
    const { onDelete, children } = this.props

    return (
      <div styleName='container'>
        <div styleName='content'>
          {children}
        </div>
        {!!onDelete &&
          <IconButton
            styleName='button'
            icon={Close}
            onClick={this.handleClick}
            aria-label='Delete row'
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
