import React from 'react'
import PropTypes from 'prop-types'
import FieldBorder from '_src/components/field/border'
import FieldDivider from '_src/components/field/divider'
import * as tagConstants from '_src/modules/tag/constants'
import TagCollection from './tag-collection'
// import TagEditorForm from '_src/containers/forms/tag-editor'

const BORDER_STYLE = { marginBottom: '1.5rem' }

const TagsEditor = ({
  value,
  formComponent,
  onDelete,
  deleteInProgress,
  constraint,
  tagType
}) => (
  <FieldBorder style={BORDER_STYLE}>
    {React.createElement(formComponent, { tagType, constraint })}
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
  tagType: PropTypes.oneOf(tagConstants.ALLOWED_TAG_TYPES).isRequired,
  deleteInProgress: PropTypes.bool.isRequired,
  constraint: PropTypes.object.isRequired,
  formComponent: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default TagsEditor
