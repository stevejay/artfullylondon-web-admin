import React from 'react'
import PropTypes from 'prop-types'

import * as image from '_src/lib/image'
import {
  ENTITY_TYPE_EVENT,
  ENTITY_TYPE_EVENT_SERIES,
  ENTITY_TYPE_TALENT,
  ENTITY_TYPE_VENUE
} from '_src/constants/entity'
import ImagePlaceholder from '_src/components/image-placeholder'
import './image.m.scss'

class Image extends React.Component {
  shouldComponentUpdate () {
    return false
  }
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
  type: PropTypes.oneOf([
    ENTITY_TYPE_EVENT,
    ENTITY_TYPE_EVENT_SERIES,
    ENTITY_TYPE_TALENT,
    ENTITY_TYPE_VENUE
  ]).isRequired,
  size: PropTypes.oneOf(['tiny', 'very-small', 'small', 'medium']).isRequired
}

export default Image
