import React from 'react'
import PropTypes from 'prop-types'
import Tag from './index'
import './collection.scss'

class TagCollection extends React.Component {
  shouldComponentUpdate (nextProps) {
    return nextProps.tags !== this.props.tags
  }
  render () {
    const { tags } = this.props

    if (!tags || tags.length === 0) {
      return null
    }

    return (
      <div styleName='container'>
        {(tags || []).map(tag => <Tag key={tag.id} tag={tag} />)}
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
