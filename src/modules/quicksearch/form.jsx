import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'

import Form from '_src/components/form'
import FormRow from '_src/components/form/row'
import SearchField from '_src/components/search-field/field'
import * as entityConstants from '_src/constants/entity'
import * as formConstants from '_src/constants/form'
import constraint from './constraint'

export class QuicksearchForm extends React.Component {
  handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault()
      this.props.handleSubmit()
    }
  }
  render () {
    const { submitting, handleSubmit, placeholder, disabled } = this.props

    return (
      <Form onKeyPress={this.handleKeyPress} onSubmit={handleSubmit}>
        <FormRow>
          <Field
            name='term'
            component={SearchField}
            searchInProgress={submitting}
            autoFocus={false}
            disabled={disabled}
            placeholder={placeholder}
            maxLength={constraint.term.length.maximum}
            handleSubmit={handleSubmit}
          />
        </FormRow>
      </Form>
    )
  }
}

QuicksearchForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string
}

QuicksearchForm.defaultProps = {
  placeholder: 'Enter a search term',
  disabled: false
}

export default reduxForm({
  form: formConstants.HEADER_SEARCH_FORM_NAME,
  initialValues: {
    term: '',
    entityType: entityConstants.ENTITY_TYPE_ALL
  }
})(QuicksearchForm)
