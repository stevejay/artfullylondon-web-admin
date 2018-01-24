import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'

import Form from '_src/components/form'
import FormRow from '_src/components/form/row'
import FormError from '_src/components/form/error'
import FormHeading from '_src/components/form/heading'
import RadioButtonField from '_src/components/radio-button/field'
import Message from '_src/components/message'
import SearchField from '_src/components/search-field/field'
import * as formConstants from '_src/constants/form'
import * as searchConstants from '_src/constants/search'
import * as searchConstraints from '_src/constants/search-constraints'
import './basic-search.scss'

export class BasicSearchForm extends React.Component {
  componentWillReceiveProps (nextProps) {
    if (
      !!this.props.entityTypeSelector &&
      nextProps.entityTypeSelector !== this.props.entityTypeSelector
    ) {
      this.props.submit()
    }
  }
  getPlaceholderText (entityType) {
    switch (entityType) {
      case 'event':
        return 'Enter an event name\u2026'
      case 'talent':
        return 'Enter a talent name\u2026'
      case 'venue':
        return 'Enter a venue name\u2026'
      default:
        return 'Enter anything\u2026'
    }
  }
  handleKeyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      this.props.handleSubmit()
    }
  }
  render () {
    const { submitting, handleSubmit, error, entityTypeSelector } = this.props

    return (
      <Form
        onKeyPress={this.handleKeyPress}
        onSubmit={handleSubmit}
        styleName='container'
      >
        <FormRow>
          <Field
            name='term'
            component={SearchField}
            searchInProgress={submitting}
            autoFocus={false}
            disabled={false}
            placeholder={this.getPlaceholderText(entityTypeSelector)}
            maxLength={
              searchConstraints.basicSearchConstraint.term.length.maximum
            }
            handleSubmit={handleSubmit}
          />
          {/* <Field
            name='entityType'
            component={RadioButtonField}
            options={searchConstants.ENTITY_TYPE_OPTIONS}
            containerStyle={{ paddingTop: 0, margin: 0, width: '100%' }}
          /> */}
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
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  error: PropTypes.string
}

const WrappedSearchForm = reduxForm({
  form: formConstants.BASIC_SEARCH_FORM_NAME
})(BasicSearchForm)

const selector = formValueSelector(formConstants.BASIC_SEARCH_FORM_NAME)

export default connect(state => ({
  initialValues: state.search.basicSearchParams,
  entityTypeSelector: selector(state, 'entityType')
}))(WrappedSearchForm)
