import React from 'react'
import PropTypes from 'prop-types'

import ImagePlaceholder from './image-placeholder'
import ImageCarousel from './image-carousel'
import ImageCredit from './image-credit'
import * as entitiesPropTypes from '_src/entities/prop-types'
import * as imageLib from '_src/lib/image'
import './image.scss'

class Image extends React.PureComponent {
  render () {
    const { entityType, images, showCarousel } = this.props
    const hasImages = !!images && images.length > 0

    if (!hasImages) {
      return (
        <div styleName='container'>
          <ImagePlaceholder
            styleName='placeholder'
            type={entityType}
            size='medium'
          />
        </div>
      )
    }

    if (showCarousel) {
      const carouselItems = images.map(image => ({
        original: imageLib.createImageUrl(image.id, '750x'),
        ratio: image.ratio,
        copyright: image.copyright,
        dominantColor: image.dominantColor
      }))

      return <ImageCarousel images={carouselItems} />
    }

    return (
      <React.Fragment>
        <div styleName='container'>
          <img
            styleName='img'
            src={imageLib.createImageUrl(images[0].id, '500x500')}
          />
        </div>
        <ImageCredit credit={images[0].copyright} />
      </React.Fragment>
    )
  }
}

Image.propTypes = {
  entityType: entitiesPropTypes.ENTITY_TYPE.isRequired,
  images: PropTypes.array,
  showCarousel: PropTypes.bool.isRequired
}

Image.defaultProps = {
  showCarousel: false
}

export default Image
