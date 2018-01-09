import React from 'react'
import PropTypes from 'prop-types'
import FieldContainer from '_src/components/field/container'
import FieldBorder from '_src/components/field/border'
import FieldDivider from '_src/components/field/divider'
import Grid from '_src/components/grid'
import LinkGridRow from '_src/components/links/grid-row'
import LinkEditorForm from '_src/containers/forms/link-editor'
import linkConstraint from '_src/constants/link-constraint'
import { getAvailableLinkTypeDropdownOptions } from '_src/lib/link'

class LinksField extends React.Component {
  shouldComponentUpdate (nextProps) {
    return (
      nextProps.input.value !== this.props.input.value ||
      nextProps.meta.touched !== this.props.meta.touched ||
      nextProps.meta.error !== this.props.meta.error
    )
  }
  handleSubmit = values => {
    const { parentFormName, linkActions } = this.props
    linkActions.addLink({ values, parentFormName })
  }
  handleDelete = key => {
    const { parentFormName, linkActions } = this.props
    linkActions.deleteLink({ key, parentFormName })
  }
  render () {
    const { label, input: { value }, meta: { touched, error } } = this.props
    const linkTypeOptions = getAvailableLinkTypeDropdownOptions(value)

    return (
      <FieldContainer
        label={label}
        htmlFor={label}
        error={error}
        touched={touched}
      >
        <FieldBorder>
          <LinkEditorForm
            ref={ref => (this._form = ref)}
            onSubmit={this.handleSubmit}
            constraint={linkConstraint}
            linkTypeOptions={linkTypeOptions}
          />
          <FieldDivider />
          <Grid>
            {value.map(element => (
              <LinkGridRow
                key={element.key}
                value={element}
                onDelete={this.handleDelete}
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
  parentFormName: PropTypes.string.isRequired,
  linkActions: PropTypes.shape({
    addLink: PropTypes.func.isRequired,
    deleteLink: PropTypes.func.isRequired
  }).isRequired
}

export default LinksField
