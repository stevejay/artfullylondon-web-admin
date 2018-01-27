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
import SearchInputToolbar from '_src/components/search-input/toolbar'
import DropdownField from '_src/components/dropdown/field'
import * as formConstants from '_src/constants/form'
import * as searchConstants from '_src/constants/search'
import * as searchConstraints from '_src/constants/search-constraints'
import * as browserConstants from '_src/constants/browser'
import * as searchActionTypes from '_src/constants/action/search'
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
    return this.props.dispatch({
      type: searchActionTypes.SEARCH,
      payload: {
        searchType: searchConstants.SEARCH_TYPE_AUTOCOMPLETE,
        query: {
          term,
          entityType: this.props.entityTypeSelector
        }
      },
      meta: { thunk: true }
    })
  }
  handleAutocompleteSelect = entity => {
    this.props.dispatch({
      type: searchActionTypes.NAVIGATE_TO_ENTITY,
      payload: entity
    })
  }
  render () {
    const { submitting, handleSubmit, error } = this.props

    return (
      <Form
        onKeyPress={this.handleKeyPress}
        onSubmit={handleSubmit}
        styleName='form-container'
      >
        <FormRow>
          <Field
            name='term'
            component={SearchInputFieldBasic}
            searchInProgress={submitting}
            maxLength={searchConstraints.BASIC_SEARCH.term.length.maximum}
            onAutocompleteSearch={this.handleAutocompleteSearch}
            onAutocompleteSelect={this.handleAutocompleteSelect}
          />
          <SearchInputToolbar>
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
            />
          </SearchInputToolbar>
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
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired
}

const WrappedSearchForm = reduxForm({
  form: formConstants.BASIC_SEARCH_FORM_NAME
})(BasicSearchForm)

const selector = formValueSelector(formConstants.BASIC_SEARCH_FORM_NAME)

export default connect(state => ({
  initialValues: state.search.basicSearchParams,
  entityTypeSelector: selector(state, 'entityType')
}))(WrappedSearchForm)
