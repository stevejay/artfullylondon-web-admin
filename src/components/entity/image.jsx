import React from 'react'
import PropTypes from 'prop-types'
import { EDITABLE_ENTITY_TYPES } from '_src/constants/entity'
import ImagePlaceholder from '_src/components/image-placeholder'
import ImageCarousel from '_src/components/entity/image-carousel'
import ImageCredit from '_src/components/entity/image-credit'
import { createEntityPageImageUrl } from '_src/lib/image'
import './image.m.scss'

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
          <img styleName='img' src={createEntityPageImageUrl(images[0].id)} />
        </div>
        <ImageCredit credit={images[0].copyright} />
      </div>
    )
  }
}

EntityImage.propTypes = {
  entityType: PropTypes.oneOf(EDITABLE_ENTITY_TYPES).isRequired,
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
