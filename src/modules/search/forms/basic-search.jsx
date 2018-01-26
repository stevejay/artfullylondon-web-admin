import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import SearchIcon from 'react-icons/lib/fa/search'

import Form from '_src/components/form'
import FormRow from '_src/components/form/row'
import FormError from '_src/components/form/error'
import IconButton from '_src/components/button/icon'
import SearchInputFieldBasic from '_src/components/search-input/field-basic'
import DropdownField from '_src/components/dropdown/field'
import * as formConstants from '_src/constants/form'
import * as searchConstants from '_src/constants/search'
import * as searchConstraints from '_src/constants/search-constraints'
import * as browserConstants from '_src/constants/browser'
import './basic-search.scss'

export class BasicSearchForm extends React.Component {
  componentWillReceiveProps (nextProps) {
    if (
      !!this.props.entityTypeSelector &&
      nextProps.entityTypeSelector !== this.props.entityTypeSelector
    ) {
      this.props.handleSubmit()
    }
  }
  handleKeyPress = event => {
    if (event.charCode === browserConstants.ENTER_CHARCODE) {
      event.preventDefault()
      this.props.handleSubmit()
    }
  }
  handleAutocompleteSearch = ({ term }) => {
    return this.props.onAutocompleteSearch({
      term,
      entityType: this.props.entityTypeSelector
    })
  }
  render () {
    const { submitting, handleSubmit, error, onAutocompleteSelect } = this.props

    return (
      <Form
        onKeyPress={this.handleKeyPress}
        onSubmit={handleSubmit}
        styleName='form-container'
      >
        <FormRow styleName='form-row'>
          <div styleName='toolbar'>
            <Field
              name='entityType'
              component={DropdownField}
              items={searchConstants.SEARCH_ENTITY_DROPDOWN_OPTIONS}
              compact
            />
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
            maxLength={searchConstraints.BASIC_SEARCH.term.length.maximum}
            // onSearch={handleSubmit}
            onAutocompleteSearch={this.handleAutocompleteSearch}
            onAutocompleteSelect={onAutocompleteSelect}
          />
        </FormRow>
        <FormError error={error} hideGenericErrorMessages />
      </Form>
    )
  }
}

BasicSearchForm.propTypes = {
  initialValues: PropTypes.shape({
    term: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    entityType: PropTypes.oneOf(
      searchConstants.ALLOWED_BASIC_SEARCH_ENTITY_TYPES
    ),
    skip: PropTypes.number.isRequired,
    take: PropTypes.number.isRequired
  }).isRequired,
  entityTypeSelector: PropTypes.string,
  error: PropTypes.string,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  onAutocompleteSearch: PropTypes.func.isRequired,
  onAutocompleteSelect: PropTypes.func.isRequired
}

const WrappedSearchForm = reduxForm({
  form: formConstants.BASIC_SEARCH_FORM_NAME
})(BasicSearchForm)

const selector = formValueSelector(formConstants.BASIC_SEARCH_FORM_NAME)

export default connect(state => ({
  initialValues: state.search.basicSearchParams,
  entityTypeSelector: selector(state, 'entityType')
}))(WrappedSearchForm)
