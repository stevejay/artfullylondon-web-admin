import React from 'react'
import PropTypes from 'prop-types'
import { withState } from 'recompose'
import _ from 'lodash'

import FadeTransition from '_src/shared/components/transition/fade'
import BoxesLoader from '_src/shared/components/loader/boxes'
import NoEntries from '_src/shared/components/no-entries'
import EditableTag from './editable-tag'
import * as tagConstants from '../constants'
import './editable-tag-collection.scss'

export class EditableTagCollection extends React.PureComponent {
  handleDelete = key => {
    this.props.setDeletingTagId(key)
    this.props.onDelete(key)
  }
  render () {
    const { tags, deleteInProgress, deletingTagId } = this.props
    const loading = _.isNil(tags)
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
                <EditableTag
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

EditableTagCollection.propTypes = {
  tags: PropTypes.arrayOf(tagConstants.TAG_PROP_TYPES),
  deletingTagId: PropTypes.string,
  deleteInProgress: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  setDeletingTagId: PropTypes.func.isRequired
}

export default withState('deletingTagId', 'setDeletingTagId', null)(
  EditableTagCollection
)
