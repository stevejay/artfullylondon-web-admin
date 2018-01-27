import React from 'react'
import PropTypes from 'prop-types'

import ImagePlaceholder from '_src/components/image-placeholder'
import ImageCarousel from '_src/components/entity/image-carousel'
import ImageCredit from '_src/components/entity/image-credit'
import * as entityConstants from '_src/constants/entity'
import * as imageLib from '_src/lib/image'
import './image.scss'

class EntityImage extends React.Component {
  shouldComponentUpdate (nextProps) {
    return nextProps.images !== this.props.images
  }
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
      return <ImageCarousel images={images || []} />
    }

    return (
      <div>
        <div styleName='container'>
          <img
            styleName='img'
            src={imageLib.createEntityPageImageUrl(images[0].id)}
          />
        </div>
        <ImageCredit credit={images[0].copyright} />
      </div>
    )
  }
}

EntityImage.propTypes = {
  entityType: PropTypes.oneOf(entityConstants.EDITABLE_ENTITY_TYPES).isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      ratio: PropTypes.number.isRequired
    })
  ),
  showCarousel: PropTypes.bool.isRequired
}

EntityImage.defaultProps = {
  showCarousel: false
}

export default EntityImage
