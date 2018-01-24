import React from 'react'
import PropTypes from 'prop-types'
import FieldBorder from '_src/components/field/border'
import FieldDivider from '_src/components/field/divider'
import { ALLOWED_TAG_TYPES } from '_src/constants/tag'

import TagCollection from './tag-collection'
// import TagEditorForm from '_src/containers/forms/tag-editor'
import './index.scss'

const TagsEditor = ({
  value,
  onDelete,
  deleteInProgress,
  constraint,
  tagType
}) => (
  <FieldBorder styleName='container'>
    {/* <TagEditorForm tagType={tagType} constraint={constraint} /> */}
    {/* {React.createElement(formComponent, { tagType, constraint })} */}
    <FieldDivider />
    <TagCollection
      value={value}
      onDelete={onDelete}
      deleteInProgress={deleteInProgress}
    />
  </FieldBorder>
)

TagsEditor.propTypes = {
  value: PropTypes.array.isRequired,
  tagType: PropTypes.oneOf(ALLOWED_TAG_TYPES).isRequired,
  deleteInProgress: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default TagsEditor
