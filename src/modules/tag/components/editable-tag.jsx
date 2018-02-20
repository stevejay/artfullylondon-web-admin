import React from 'react'
import PropTypes from 'prop-types'
import CloseIcon from 'react-icons/lib/fa/close'

import IconButton from '_src/shared/components/button/icon'
import Loader from '_src/shared/components/loader'
import * as tagConstants from '../constants'
import './editable-tag.scss'

class EditableTag extends React.PureComponent {
  handleClick = () => {
    this.props.onDelete(this.props.tag.id)
  }
  render () {
    const { tag: { label }, isBeingDeleted } = this.props

    return (
      <li styleName='tag'>
        <span>{label}</span>
        {isBeingDeleted &&
          <div styleName='loader'>
            <Loader size='small' type='inverse' />
          </div>}
        {!isBeingDeleted &&
          <IconButton
            icon={CloseIcon}
            onClick={this.handleClick}
            type='inverse'
            compact
          />}
      </li>
    )
  }
}

EditableTag.propTypes = {
  tag: tagConstants.TAG_PROP_TYPES.isRequired,
  isBeingDeleted: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default EditableTag
