import React from 'react'
import PropTypes from 'prop-types'
import FieldBorder from '_src/components/field/border'
import FieldDivider from '_src/components/field/divider'
import { ALLOWED_TAG_TYPES } from '_src/constants/tag'

import TagCollection from './tag-collection'
import TagEditorForm from '_src/modules/tags/forms/tag-editor'
import './index.scss'

const TagsEditor = ({
  tags,
  tagType,
  getInProgress,
  deleteInProgress,
  onDelete,
  onAdd,
  constraint
}) => (
  <FieldBorder styleName='container'>
    <TagEditorForm
      tagType={tagType}
      canAddTag={!getInProgress}
      initialValues={{ tagType, label: '' }}
      onSubmit={onAdd}
    />
    <FieldDivider />
    <TagCollection
      tagType={tagType}
      tags={tags}
      onDelete={onDelete}
      getInProgress={getInProgress}
      deleteInProgress={deleteInProgress}
    />
  </FieldBorder>
)

TagsEditor.propTypes = {
  tags: PropTypes.array,
  tagType: PropTypes.oneOf(ALLOWED_TAG_TYPES).isRequired,
  getInProgress: PropTypes.bool.isRequired,
  deleteInProgress: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired
}

export default TagsEditor
