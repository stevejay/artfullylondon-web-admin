import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import SearchIcon from 'react-icons/lib/fa/search'

import Form from '_src/components/form'
import FormRow from '_src/components/form/row'
import FormError from '_src/components/form/error'
import IconButton from '_src/components/button/icon'
import SearchInputFieldBasic from '../components/search-input/field-basic'
import SearchInputToolbar from '../components/search-input/toolbar'
import DropdownField from '_src/components/dropdown/field'
import * as searchConstants from '../constants'
import * as browserConstants from '_src/constants/browser'
import * as searchActions from '../actions'
import { selectors as searchSelectors } from '../reducers'
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
  // TODO can I change the Form component somehow so this handle is unnecessary?
  handleKeyPress = event => {
    if (event.charCode === browserConstants.ENTER_CHARCODE) {
      event.preventDefault()
      this.props.handleSubmit()
    }
  }
  handleAutocompleteSearch = ({ term }) => {
    return this.props.dispatch(
      searchActions.autocompleteSearch(term, this.props.entityTypeSelector)
    )
  }
  handleAutocompleteSelect = entity => {
    this.props.dispatch(searchActions.navigateToEntity(entity))
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
            maxLength={
              searchConstants.BASIC_SEARCH_CONSTRAINT.term.length.maximum
            }
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
  form: searchConstants.BASIC_SEARCH_FORM_NAME
})(BasicSearchForm)

const selector = formValueSelector(searchConstants.BASIC_SEARCH_FORM_NAME)

export default connect(
  /* istanbul ignore next */
  state => ({
    initialValues: searchSelectors.basicSearchParams(state),
    entityTypeSelector: selector(state, 'entityType')
  })
)(WrappedSearchForm)
