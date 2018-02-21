import React from 'react'
import PropTypes from 'prop-types'
import Trash from 'react-icons/lib/fa/trash-o'
import Heart from 'react-icons/lib/fa/heart'
import Pencil from 'react-icons/lib/fa/pencil'

import IconButton from '_src/shared/components/button/icon'
import ImageGridImage from './image-grid-image'
import * as entityType from '_src/domain/types/entity-type'
import './image-grid-card.scss'

class ImageGridCard extends React.Component {
  shouldComponentUpdate (nextProps, nextState) {
    return nextProps.value !== this.props.value
  }
  handleDelete = event => {
    event.preventDefault()
    this.props.onDelete(this.props.value.id)
  }
  handleSetMain = event => {
    event.preventDefault()
    this.props.onSetMain(this.props.value.id)
  }
  handleEditImage = () => {
    this.props.onUpdate(this.props.value)
  }
  render () {
    const { value: { id, copyright, ratio, isMain }, entityType } = this.props

    return (
      <div styleName='card'>
        <ImageGridImage
          imageId={id}
          type={entityType}
          ratio={ratio}
          size='very-small'
        />
        <div styleName='details-container'>
          {copyright
            ? <p><strong>©</strong> {copyright}</p>
            : <p styleName='no-copyright'>No Copyright String</p>}
          <div styleName='toolbar'>
            {isMain
              ? <Heart styleName='icon-main' />
              : <IconButton
                icon={Heart}
                onClick={this.handleSetMain}
                aria-label='Set as main'
              />}
            <IconButton
              icon={Trash}
              onClick={this.handleDelete}
              aria-label='Delete'
            />
            <IconButton
              icon={Pencil}
              onClick={this.handleEditImage}
              aria-label='Edit'
            />
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
  entityType: PropTypes.oneOf(entityType.VALUES).isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onSetMain: PropTypes.func.isRequired
}

export default ImageGridCard
