import React from 'react'
import PropTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import _ from 'lodash'

import FadeTransition from '_src/components/transition/fade'
import BoxesLoader from '_src/components/loader/boxes'
import NoEntries from '_src/components/no-entries'
import Tag from '_src/modules/tags/components/tags-editor/tag'
import './tag-collection.scss'

class TagCollection extends React.Component {
  constructor (props) {
    super(props)
    this.state = { deletingTagId: null }
  }
  shouldComponentUpdate (nextProps, nextState) {
    return (
      nextProps.tags !== this.props.tags ||
      nextProps.getInProgress !== this.props.getInProgress ||
      nextProps.deleteInProgress !== this.props.deleteInProgress ||
      nextState.deletingTagId !== this.state.deletingTagId
    )
  }
  handleDelete = key => {
    this.setState({ deletingTagId: key })
    this.props.onDelete(key)
  }
  render () {
    const { tagType, tags, getInProgress, deleteInProgress } = this.props
    const { deletingTagId } = this.state
    const loading = getInProgress || _.isNil(tags)
    const hasTags = !_.isEmpty(tags) && tagType !== 'medium'

    return (
      <div styleName='container'>
        {loading && <BoxesLoader />}
        <FadeTransition in={!loading}>
          <div styleName='content-container'>
            {!hasTags && <NoEntries label='No Tags' />}
            {hasTags &&
              tags.map(x => (
                <Tag
                  key={x.id}
                  tag={x}
                  onDelete={this.handleDelete}
                  isBeingDeleted={deleteInProgress && deletingTagId === x.id}
                />
              ))}
          </div>
        </FadeTransition>
      </div>
    )
  }
}

TagCollection.propTypes = {
  tagType: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired
    })
  ),
  onDelete: PropTypes.func.isRequired,
  getInProgress: PropTypes.bool.isRequired,
  deleteInProgress: PropTypes.bool.isRequired
}

export default TagCollection
