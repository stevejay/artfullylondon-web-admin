import React from 'react'
import PropTypes from 'prop-types'

import FieldContainer from '_src/components/field/container'
import FieldBorder from '_src/components/field/border'
import FieldDivider from '_src/components/field/divider'
import Grid from '_src/components/grid'
import LinkGridRow from '_src/components/links/grid-row'
import LinksEditorForm from '_src/components/links/editor-form'
import * as linkLib from '_src/lib/link'

class LinksField extends React.Component {
  shouldComponentUpdate (nextProps) {
    return (
      nextProps.input.value !== this.props.input.value ||
      nextProps.meta.touched !== this.props.meta.touched ||
      nextProps.meta.error !== this.props.meta.error
    )
  }
  render () {
    const {
      label,
      input: { value },
      meta: { touched, error },
      onAddLink,
      onDeleteLink
    } = this.props

    const linkTypeOptions = linkLib.getAvailableLinkTypeDropdownOptions(value)

    return (
      <FieldContainer
        label={label}
        htmlFor={label}
        error={error}
        touched={touched}
      >
        <FieldBorder>
          <LinksEditorForm
            onSubmit={onAddLink}
            linkTypeOptions={linkTypeOptions}
          />
          <FieldDivider />
          <Grid>
            {value.map(element => (
              <LinkGridRow
                key={element.key}
                value={element}
                onDelete={onDeleteLink}
              />
            ))}
          </Grid>
        </FieldBorder>
      </FieldContainer>
    )
  }
}

LinksField.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({
    value: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired
      })
    ).isRequired,
    onChange: PropTypes.func.isRequired
  }),
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.any
  }),
  onAddLink: PropTypes.func.isRequired,
  onDeleteLink: PropTypes.func.isRequired
}

export default LinksField
