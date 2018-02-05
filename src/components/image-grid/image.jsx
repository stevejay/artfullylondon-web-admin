import React from 'react'
import PropTypes from 'prop-types'
import { shouldUpdate } from 'recompose'

import ImagePlaceholder from '_src/components/image-placeholder'
import * as image from '_src/lib/image'
import * as entityConstants from '_src/constants/entity'
import './image.scss'

export class Image extends React.Component {
  render () {
    const { imageId, size, type } = this.props

    if (imageId) {
      const imageUrl = image.createEntityEditPreviewImageUrl(imageId)
      return <img src={imageUrl} styleName={size} />
    } else {
      return <ImagePlaceholder size={size} type={type} />
    }
  }
}

Image.propTypes = {
  imageId: PropTypes.string,
  type: PropTypes.oneOf(entityConstants.EDITABLE_ENTITY_TYPES).isRequired,
  size: PropTypes.oneOf(['tiny', 'very-small', 'small', 'medium']).isRequired
}

export default shouldUpdate(() => false)(Image)
