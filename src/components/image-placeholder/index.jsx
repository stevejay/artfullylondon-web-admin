import React from 'react'
import PropTypes from 'prop-types'
import Bank from 'react-icons/lib/fa/bank'
import User from 'react-icons/lib/fa/user'
import Star from 'react-icons/lib/fa/star-o'
import Tags from 'react-icons/lib/fa/tags'
import Cogs from 'react-icons/lib/fa/cogs'

import * as entityConstants from '_src/constants/entity'
import './index.scss'

class ImagePlaceholder extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  getIcon (type) {
    switch (type) {
      case entityConstants.ENTITY_TYPE_EVENT:
        return <Star styleName='icon' />
      case entityConstants.ENTITY_TYPE_EVENT_SERIES:
        return <Star styleName='icon' />
      case entityConstants.ENTITY_TYPE_TALENT:
        return <User styleName='icon' />
      case entityConstants.ENTITY_TYPE_VENUE:
        return <Bank styleName='icon' />
      case entityConstants.ENTITY_TYPE_TAG:
        return <Tags styleName='icon' />
      case entityConstants.ENTITY_TYPE_USER:
        return <Cogs styleName='icon' />
      default:
        throw new Error(`unknown type option of ${type}`)
    }
  }
  render () {
    const { type, size, className, ...rest } = this.props

    return (
      <div {...rest} role='presentation' styleName={size} className={className}>
        {this.getIcon(type)}
      </div>
    )
  }
}

ImagePlaceholder.propTypes = {
  type: PropTypes.oneOf(entityConstants.ALL_ENTITY_TYPES).isRequired,
  size: PropTypes.oneOf([
    'tiny',
    'very-small',
    'small',
    'smallmedium',
    'medium',
    'large'
  ]).isRequired,
  className: PropTypes.string
}

export default ImagePlaceholder
