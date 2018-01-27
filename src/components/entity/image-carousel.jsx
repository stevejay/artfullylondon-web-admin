import React from 'react'
import PropTypes from 'prop-types'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/scss/image-gallery-no-icon.scss'

import ImageCredit from '_src/components/entity/image-credit'
import * as imageLib from '_src/lib/image'
import './image-carousel.scss'

// TODO remove the extra render methods.

class ImageCarousel extends React.Component {
  constructor (props) {
    super(props)
    this.state = { currentIndex: 0 }
  }
  shouldComponentUpdate (nextProps, nextState) {
    return (
      nextProps.images !== this.props.images ||
      nextState.currentIndex !== this.state.currentIndex
    )
  }
  handleSlide = index => {
    this.setState({ currentIndex: index })
  }
  _renderLeftNav (onClick, _disabled) {
    return (
      <div className='image-gallery-custom-left-nav' onClick={onClick}>
        <svg width='24' height='24' viewBox='0 0 512 512' fill='#333333'>
          <path d='M 416.00,416.00l-96.00,96.00L 64.00,256.00L 320.00,0.00l 96.00,96.00L 256.00,256.00L 416.00,416.00z' />
        </svg>
      </div>
    )
  }
  _renderRightNav (onClick, _disabled) {
    return (
      <div className='image-gallery-custom-right-nav' onClick={onClick}>
        <svg width='24' height='24' viewBox='0 0 512 512' fill='#333333'>
          <path d='M 64.00,416.00l 96.00,96.00l 256.00-256.00L 160.00,0.00L 64.00,96.00l 160.00,160.00L 64.00,416.00z' />
        </svg>
      </div>
    )
  }
  _renderItem (item) {
    const desiredHeight = 400
    const maxWidth = `${Math.round(desiredHeight / item.ratio)}px`
    const style = { width: '100vw', maxWidth: maxWidth }

    if (item.dominantColor) {
      style.backgroundColor = '#' + item.dominantColor
    }

    return (
      <div className='image-gallery-image'>
        <img style={style} src={item.original} alt={item.originalAlt} />
      </div>
    )
  }
  render () {
    const { images } = this.props
    const imagePaths = images.map(image =>
      imageLib.createPathsForImageCarousel(image)
    )
    const copyright = images[this.state.currentIndex].copyright

    return (
      <div>
        <ImageGallery
          items={imagePaths}
          lazyLoad
          showThumbnails={false}
          showFullscreenButton={false}
          showPlayButton={false}
          onSlide={this.handleSlide}
          renderItem={this._renderItem}
          renderLeftNav={this._renderLeftNav}
          renderRightNav={this._renderRightNav}
        />
        <ImageCredit credit={copyright} />
      </div>
    )
  }
}

ImageCarousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      ratio: PropTypes.number.isRequired,
      copyright: PropTypes.string,
      dominantColor: PropTypes.string
    })
  ).isRequired
}

export default ImageCarousel
