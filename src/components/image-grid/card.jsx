import React from 'react'
import PropTypes from 'prop-types'
import Trash from 'react-icons/lib/fa/trash-o'
import Heart from 'react-icons/lib/fa/heart'
import Pencil from 'react-icons/lib/fa/pencil'
import {
  ENTITY_TYPE_EVENT,
  ENTITY_TYPE_EVENT_SERIES,
  ENTITY_TYPE_TALENT,
  ENTITY_TYPE_VENUE
} from '_src/constants/entity'
import Image from '_src/components/image-grid/image'
import './card.scss'

class ImageGridCard extends React.Component {
  shouldComponentUpdate (nextProps) {
    return nextProps.value !== this.props.value
  }
  handleDelete = event => {
    event.preventDefault()
    const { value: { key }, onDelete } = this.props
    onDelete(key)
  }
  handleUpdateCopyright = event => {
    event.preventDefault()
    const { value: { key, copyright }, onUpdateCopyright } = this.props
    onUpdateCopyright({ key, copyright })
  }
  handleSetMain = event => {
    event.preventDefault()
    const { value: { key }, onSetMain } = this.props
    onSetMain(key)
  }
  render () {
    const { value: { id, copyright, ratio, isMain }, entityType } = this.props

    return (
      <div styleName='card'>
        <Image imageId={id} type={entityType} ratio={ratio} size='very-small' />
        <div styleName='details-container'>
          {copyright
            ? <p><strong>©</strong> {copyright}</p>
            : <p styleName='no-copyright'>No Copyright String</p>}
          <div styleName='toolbar'>
            {isMain
              ? <Heart styleName='icon-main' />
              : <a styleName='link' onClick={this.handleSetMain}>
                <Heart styleName='icon' />
              </a>}
            <a styleName='link' onClick={this.handleDelete}>
              <Trash styleName='icon' />
            </a>
            <a styleName='link' onClick={this.handleUpdateCopyright}>
              <Pencil styleName='icon' />
            </a>
          </div>
        </div>
      </div>
    )
  }
}

ImageGridCard.propTypes = {
  value: PropTypes.shape({
    key: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    isMain: PropTypes.bool.isRequired,
    copyright: PropTypes.string,
    ratio: PropTypes.number
  }).isRequired,
  entityType: PropTypes.oneOf([
    ENTITY_TYPE_EVENT,
    ENTITY_TYPE_EVENT_SERIES,
    ENTITY_TYPE_TALENT,
    ENTITY_TYPE_VENUE
  ]).isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdateCopyright: PropTypes.func.isRequired,
  onSetMain: PropTypes.func.isRequired
}

export default ImageGridCard
