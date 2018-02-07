import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import Form from '_src/components/form'
import FormRow from '_src/components/form/row'
import FormHeading from '_src/components/form/heading'
import RadioButtonField from '_src/components/radio-button/field'
import Message from '_src/components/message'
import SearchField from '_src/components/search-field/field'
import { BASIC_SEARCH_FORM_NAME } from '_src/constants/form'
import {
  ENTITY_TYPE_OPTIONS,
  ALLOWED_BASIC_SEARCH_ENTITY_TYPES
} from '_src/constants/search'
import { basicSearchConstraint } from '_src/constants/search-constraints'
import './index.scss'

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
    const placeholder = this.getPlaceholderText(entityTypeSelector)

    return (
      <Form onKeyPress={this.handleKeyPress} onSubmit={handleSubmit}>
        <div styleName='top-inputs-container'>
          <FormHeading><span>Quick</span>&nbsp;Search</FormHeading>
          <FormRow styleName='row'>
            <Field
              name='term'
              component={SearchField}
              searchInProgress={submitting}
              autoFocus={false}
              disabled={false}
              placeholder={placeholder}
              maxLength={basicSearchConstraint.term.length.maximum}
              handleSubmit={handleSubmit}
            />
          </FormRow>
        </div>
        <div styleName='bottom-inputs-container'>
          {!!error && <Message type='error'>{error}</Message>}
          <FormRow styleName='row'>
            <label styleName='label'>Search within</label>
            <Field
              name='entityType'
              component={RadioButtonField}
              options={ENTITY_TYPE_OPTIONS}
              containerStyle={{ paddingTop: 0, margin: 0, width: '100%' }}
            />
          </FormRow>
        </div>
      </Form>
    )
  }
}

BasicSearchForm.propTypes = {
  initialValues: PropTypes.shape({
    term: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    entityType: PropTypes.oneOf(ALLOWED_BASIC_SEARCH_ENTITY_TYPES),
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
  form: BASIC_SEARCH_FORM_NAME
})(BasicSearchForm)

const selector = formValueSelector(BASIC_SEARCH_FORM_NAME)

export default connect(state => ({
  initialValues: state.search.basicSearchParams,
  entityTypeSelector: selector(state, 'entityType')
}))(WrappedSearchForm)
