import React from 'react'
import PropTypes from 'prop-types'
import LazyLoad from 'react-lazyload'
import { Link } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import ShouldNeverUpdateComponent
  from '_src/components/base-class/should-never-update'
import { ImagePlaceholder } from '_src/modules/image'
import * as entityCardLib from '../../lib/entity-card'
import * as entitiesPropTypes from '_src/entities/prop-types'
import './image.scss'

class Image extends ShouldNeverUpdateComponent {
  handleImageLoad = () => {
    const { entity: { entityType, id }, onImageLoad } = this.props
    onImageLoad && onImageLoad({ entityType, id })
  }
  render () {
    const { entity: { id, entityType, image, cardImageLoaded } } = this.props

    const hasImage = !!image
    const entityUrl = this.props.entity.url

    if (!hasImage) {
      return (
        <Link to={entityUrl} styleName='lazy-load-container'>
          <ImagePlaceholder type={entityType} size='smallmedium' />
        </Link>
      )
    }

    const imageData = entityCardLib.getEntityCardImageData(image)

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
    entityType: entitiesPropTypes.ENTITY_TYPE.isRequired,
    url: PropTypes.string.isRequired,
    image: PropTypes.string,
    cardImageLoaded: PropTypes.bool
  }).isRequired,
  onImageLoad: PropTypes.func
}

export default Image
