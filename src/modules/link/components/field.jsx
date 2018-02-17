import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import FieldContainer from '_src/components/field/container'
import FieldBorder from '_src/components/field/border'
import FieldDivider from '_src/components/field/divider'
import Grid from '_src/components/grid'
import LinksGridRow from './grid-row'
import AddLinkForm from '../forms/add-link'
import * as linkLib from '../lib/link'
import * as linkActions from '../actions'

export class LinksField extends React.Component {
  shouldComponentUpdate (nextProps) {
    return (
      nextProps.input.value !== this.props.input.value ||
      nextProps.meta.touched !== this.props.meta.touched ||
      nextProps.meta.error !== this.props.meta.error
    )
  }
  handleAddLink = values => {
    this.props.dispatch(linkActions.addLink(values, this.props.parentFormName))
  }
  handleDeleteLink = id => {
    this.props.dispatch(linkActions.deleteLink(id, this.props.parentFormName))
  }
  render () {
    const { label, input: { value }, meta: { touched, error } } = this.props
    const linkTypeOptions = linkLib.getAvailableLinkTypeDropdownOptions(value)

    return (
      <FieldContainer
        label={label}
        htmlFor={label}
        error={error}
        touched={touched}
      >
        <FieldBorder>
          <AddLinkForm
            onSubmit={this.handleAddLink}
            linkTypeOptions={linkTypeOptions}
          />
          <FieldDivider />
          <Grid>
            {value.map(element => (
              <LinksGridRow
                key={element.key}
                value={element}
                onDelete={this.handleDeleteLink}
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
  parentFormName: PropTypes.string.isRequired,
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
  dispatch: PropTypes.func.isRequired
}

export default connect()(LinksField)
