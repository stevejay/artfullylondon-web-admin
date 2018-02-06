import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import SearchIcon from 'react-icons/lib/fa/search'

import IconButton from '_src/components/button/icon'
import Form from '_src/components/form'
import FormRow from '_src/components/form/row'
import SearchInputFieldBasic from '_src/components/search-input/field-basic'
import SearchInputToolbar from '_src/components/search-input/toolbar'
import * as entityConstants from '_src/constants/entity'
import * as formConstants from '_src/constants/form'
import * as browserConstants from '_src/constants/browser'
import * as searchConstants from '_src/modules/search/constants'

export class QuicksearchForm extends React.Component {
  handleKeyPress = event => {
    if (event.charCode === browserConstants.ENTER_CHARCODE) {
      event.preventDefault()
      this.props.handleSubmit()
    }
  }
  render () {
    const {
      submitting,
      handleSubmit,
      placeholder,
      disabled,
      onAutocompleteSearch,
      onAutocompleteSelect
    } = this.props

    return (
      <Form onKeyPress={this.handleKeyPress} onSubmit={handleSubmit}>
        <FormRow>
          <Field
            name='term'
            component={SearchInputFieldBasic}
            searchInProgress={submitting}
            autoFocus
            disabled={disabled}
            placeholder={placeholder}
            maxLength={
              searchConstants.BASIC_SEARCH_CONSTRAINT.term.length.maximum
            }
            onAutocompleteSearch={onAutocompleteSearch}
            onAutocompleteSelect={onAutocompleteSelect}
          />
          <SearchInputToolbar>
            <IconButton
              icon={SearchIcon}
              onClick={handleSubmit}
              aria-label='Search'
            />
          </SearchInputToolbar>
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
  placeholder: PropTypes.string,
  onAutocompleteSearch: PropTypes.func.isRequired,
  onAutocompleteSelect: PropTypes.func.isRequired
}

QuicksearchForm.defaultProps = {
  placeholder: 'Enter a search term\u2026',
  disabled: false
}

/* istanbul ignore next */
export default reduxForm({
  form: formConstants.HEADER_SEARCH_FORM_NAME,
  initialValues: {
    term: '',
    entityType: entityConstants.ENTITY_TYPE_ALL
  }
})(QuicksearchForm)
