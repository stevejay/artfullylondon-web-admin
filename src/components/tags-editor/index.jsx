import React from 'react'
import PropTypes from 'prop-types'
import FieldBorder from '_src/components/field/border'
import FieldDivider from '_src/components/field/divider'
import { ALLOWED_TAG_TYPES } from '_src/constants/tag'
import TagCollection from './tag-collection'

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
  tagType: PropTypes.oneOf(ALLOWED_TAG_TYPES).isRequired,
  deleteInProgress: PropTypes.bool.isRequired,
  constraint: PropTypes.object.isRequired,
  formComponent: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default TagsEditor
