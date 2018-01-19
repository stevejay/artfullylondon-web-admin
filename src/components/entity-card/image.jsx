import React from 'react'
import PropTypes from 'prop-types'
import LazyLoad from 'react-lazyload'
import { Link } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import { getEntityCardImageDataForEntityType } from '_src/lib/entity'
import { EDITABLE_ENTITY_TYPES } from '_src/constants/entity'
import ImagePlaceholder from '_src/components/image-placeholder'
import './image.scss'

class Image extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  handleImageLoad = () => {
    const { entity: { entityType, id }, onImageLoad } = this.props

    if (onImageLoad) {
      onImageLoad({ entityType, id })
    }
  }
  render () {
    const {
      entity: { id, entityType, image, imageRatio, cardImageLoaded }
    } = this.props

    const hasImage = !!image
    const entityUrl = this.props.entity.url

    if (!hasImage) {
      return (
        <Link to={entityUrl} styleName='lazy-load-container'>
          <ImagePlaceholder type={entityType} size='smallmedium' />
        </Link>
      )
    }

    const imageData = getEntityCardImageDataForEntityType(
      entityType,
      image,
      imageRatio
    )

    if (cardImageLoaded) {
      return (
        <Link to={entityUrl} styleName='lazy-load-container'>
          <img aria-labelledby={id} src={imageData.url} />
        </Link>
      )
    }

    return (
      <Link to={entityUrl} styleName='lazy-load-container'>
        <LazyLoad height={175} once>
          <TransitionGroup key='1'>
            <CSSTransition classNames='entitycard' timeout={250}>
              <img
                aria-labelledby={id}
                src={imageData.url}
                onLoad={this.handleImageLoad}
              />
            </CSSTransition>
          </TransitionGroup>
        </LazyLoad>
      </Link>
    )
  }
}

Image.propTypes = {
  entity: PropTypes.shape({
    id: PropTypes.string.isRequired,
    entityType: PropTypes.oneOf(EDITABLE_ENTITY_TYPES).isRequired,
    url: PropTypes.string.isRequired,
    image: PropTypes.string,
    imageRatio: PropTypes.number,
    cardImageLoaded: PropTypes.bool
  }).isRequired,
  onImageLoad: PropTypes.func
}

export default Image
