import React from 'react'
import PropTypes from 'prop-types'
import { ALL_ENTITY_TYPES } from '_src/constants/entity'
import * as entity from '_src/lib/entity'
import * as constants from '_src/constants/entity'
import './index.m.scss'

class ImagePlaceholder extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  getIcon (type) {
    switch (type) {
      case constants.ENTITY_TYPE_EVENT:
        return <Star styleName='icon' />
      case constants.ENTITY_TYPE_EVENT_SERIES:
        return <Star styleName='icon' />
      case constants.ENTITY_TYPE_TALENT:
        return <User styleName='icon' />
      case constants.ENTITY_TYPE_VENUE:
        return <Bank styleName='icon' />
      case constants.ENTITY_TYPE_TAG:
        return <Tags styleName='icon' />
      case constants.ENTITY_TYPE_USER:
        return <Cogs styleName='icon' />
      default:
        throw new Error(`unknown type option of ${type}`)
    }
  }
  render () {
    const { type, size, ...rest } = this.props

    return (
      <div {...rest} role='presentation' styleName={size}>
        {this.getIcon(type)}
      </div>
    )
  }
}

ImagePlaceholder.propTypes = {
  type: PropTypes.oneOf(ALL_ENTITY_TYPES).isRequired,
  size: PropTypes.oneOf([
    'tiny',
    'very-small',
    'small',
    'smallmedium',
    'medium',
    'large'
  ]).isRequired
}

export default ImagePlaceholder
