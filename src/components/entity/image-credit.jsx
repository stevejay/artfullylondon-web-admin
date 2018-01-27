import React from 'react'
import PropTypes from 'prop-types'
import './image-credit.scss'

class ImageCredit extends React.PureComponent {
  render () {
    const { credit } = this.props
    return credit ? <div styleName='credit'>IMAGE CREDIT: {credit}</div> : null
  }
}

ImageCredit.propTypes = {
  credit: PropTypes.string
}

export default ImageCredit
