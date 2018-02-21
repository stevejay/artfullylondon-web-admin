import React from 'react'
import PropTypes from 'prop-types'

import ShouldNeverUpdateComponent
  from '_src/shared/components/base-class/should-never-update'
import ImagePlaceholder from './image-placeholder'
import * as imageLib from '_src/shared/lib/image'
import * as entityType from '_src/domain/types/entity-type'
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
  type: PropTypes.oneOf(entityType.VALUES).isRequired,
  size: PropTypes.oneOf(['tiny', 'very-small', 'small', 'medium']).isRequired
}

export default ImageGridImage
