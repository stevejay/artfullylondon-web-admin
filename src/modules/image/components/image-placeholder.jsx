import React from 'react'
import PropTypes from 'prop-types'
import Bank from 'react-icons/lib/fa/bank'
import User from 'react-icons/lib/fa/user'
import Star from 'react-icons/lib/fa/star-o'
import Tags from 'react-icons/lib/fa/tags'
import Cogs from 'react-icons/lib/fa/cogs'

import ShouldNeverUpdateComponent
  from '_src/shared/components/base-class/should-never-update'
import * as entitiesPropTypes from '_src/domain/prop-types'
import entityType from '_src/domain/types/entity-type'
import './image-placeholder.scss'

class ImagePlaceholder extends ShouldNeverUpdateComponent {
  getIcon (type) {
    switch (type) {
      case entityType.EVENT:
        return <Star styleName='icon' />
      case entityType.EVENT_SERIES:
        return <Star styleName='icon' />
      case entityType.TALENT:
        return <User styleName='icon' />
      case entityType.VENUE:
        return <Bank styleName='icon' />
      case entityType.TAG:
        return <Tags styleName='icon' />
      case entityType.USER:
        return <Cogs styleName='icon' />
      /* istanbul ignore next */
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
  type: entitiesPropTypes.ENTITY_TYPE.isRequired,
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
