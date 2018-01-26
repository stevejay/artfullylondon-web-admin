import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import SearchIcon from 'react-icons/lib/fa/search'

import IconButton from '_src/components/button/icon'
import Form from '_src/components/form'
import FormRow from '_src/components/form/row'
import SearchInputFieldBasic from '_src/components/search-input/field-basic'
import * as entityConstants from '_src/constants/entity'
import * as formConstants from '_src/constants/form'
import * as browserConstants from '_src/constants/browser'
import * as searchConstraints from '_src/constants/search-constraints'
import './quicksearch.scss'

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
        <FormRow styleName='form-row'>
          <div styleName='toolbar'>
            <IconButton
              icon={SearchIcon}
              onClick={handleSubmit}
              aria-label='Search'
              styleName='search-button'
            />
          </div>
          <Field
            name='term'
            component={SearchInputFieldBasic}
            searchInProgress={submitting}
            autoFocus
            disabled={disabled}
            placeholder={placeholder}
            maxLength={searchConstraints.BASIC_SEARCH.term.length.maximum}
            // onSearch={handleSubmit}
            onAutocompleteSearch={onAutocompleteSearch}
            onAutocompleteSelect={onAutocompleteSelect}
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
