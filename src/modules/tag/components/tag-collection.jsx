import React from 'react'
import PropTypes from 'prop-types'

import Tag from './tag'
import './tag-collection.scss'

class TagCollection extends React.PureComponent {
  render () {
    const { tags } = this.props

    if (!tags || tags.length === 0) {
      return null
    }

    return (
      <div styleName='container'>
        {tags.map(tag => <Tag key={tag.id} tag={tag} />)}
      </div>
    )
  }
}

TagCollection.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  )
}

export default TagCollection
