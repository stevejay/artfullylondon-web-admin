import React from 'react'
import PropTypes from 'prop-types'

import ImagePlaceholder from '_src/modules/image/components/image-placeholder'
import ImageCarousel from '_src/modules/image/components/image-carousel'
import ImageCredit from '_src/modules/image/components/image-credit'
import * as entityConstants from '_src/constants/entity'
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
      return <ImageCarousel images={images} />
    }

    return (
      <React.Fragment>
        <div styleName='container'>
          <img
            styleName='img'
            src={imageLib.createEntityPageImageUrl(images[0].id)}
          />
        </div>
        <ImageCredit credit={images[0].copyright} />
      </React.Fragment>
    )
  }
}

Image.propTypes = {
  entityType: PropTypes.oneOf(entityConstants.EDITABLE_ENTITY_TYPES).isRequired,
  images: PropTypes.array,
  showCarousel: PropTypes.bool.isRequired
}

Image.defaultProps = {
  showCarousel: false
}

export default Image