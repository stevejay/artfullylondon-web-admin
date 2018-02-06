import React from 'react'
import PropTypes from 'prop-types'
import { withState } from 'recompose'
import _ from 'lodash'

import FadeTransition from '_src/components/transition/fade'
import BoxesLoader from '_src/components/loader/boxes'
import NoEntries from '_src/components/no-entries'
import Tag from '_src/modules/tag/components/tag'
import * as tagConstants from '_src/modules/tag/constants'
import './tag-collection.scss'

export class TagCollection extends React.PureComponent {
  handleDelete = key => {
    this.props.setDeletingTagId(key)
    this.props.onDelete(key)
  }
  render () {
    const { tags, getInProgress, deleteInProgress, deletingTagId } = this.props
    const loading = getInProgress || _.isNil(tags)
    const hasTags = !_.isEmpty(tags)

    return (
      <div styleName='container'>
        {loading && <BoxesLoader />}
        <FadeTransition in={!loading && !hasTags}>
          <NoEntries label='No Tags' />
        </FadeTransition>
        <FadeTransition in={!loading && hasTags}>
          <ul role='presentation'>
            {hasTags &&
              tags.map(x => (
                <Tag
                  key={x.id}
                  tag={x}
                  onDelete={this.handleDelete}
                  isBeingDeleted={deleteInProgress && deletingTagId === x.id}
                />
              ))}
          </ul>
        </FadeTransition>
      </div>
    )
  }
}

TagCollection.propTypes = {
  tags: PropTypes.arrayOf(tagConstants.TAG_PROP_TYPES),
  getInProgress: PropTypes.bool.isRequired,
  deletingTagId: PropTypes.string,
  deleteInProgress: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  setDeletingTagId: PropTypes.func.isRequired
}

export default withState('deletingTagId', 'setDeletingTagId', null)(
  TagCollection
)
