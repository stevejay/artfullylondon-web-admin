import React from 'react'
import PropTypes from 'prop-types'

import ShouldNeverUpdateComponent
  from '_src/components/base-class/should-never-update'
import ImagePlaceholder from './image-placeholder'
import * as imageLib from '_src/lib/image'
import * as entitiesPropTypes from '_src/entities/prop-types'
import './image-grid-image.scss'

class ImageGridImage extends ShouldNeverUpdateComponent {
  render () {
    const { imageId, size, type } = this.props

    if (imageId) {
      const imageUrl = imageLib.createEntityEditPreviewImageUrl(imageId)
      return <img src={imageUrl} styleName={size} />
    } else {
      return <ImagePlaceholder size={size} type={type} />
    }
  }
}

ImageGridImage.propTypes = {
  imageId: PropTypes.string,
  type: entitiesPropTypes.ENTITY_TYPE.isRequired,
  size: PropTypes.oneOf(['tiny', 'very-small', 'small', 'medium']).isRequired
}

export default ImageGridImage
