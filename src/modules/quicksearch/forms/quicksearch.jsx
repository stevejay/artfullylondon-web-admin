import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import SearchIcon from 'react-icons/lib/fa/search'

import DropdownField from '_src/components/dropdown/field'
import IconButton from '_src/components/button/icon'
import Form from '_src/components/form'
import FormRow from '_src/components/form/row'
import SearchField from '_src/components/search-field'
import * as entityConstants from '_src/constants/entity'
import * as formConstants from '_src/constants/form'
import * as browserConstants from '_src/constants/browser'
import * as searchConstants from '_src/constants/search'
import * as constraints from './constraints'
import './quicksearch.scss'

export class QuicksearchForm extends React.Component {
  handleKeyPress = event => {
    if (event.charCode === browserConstants.ENTER_CHARCODE) {
      event.preventDefault()
      this.props.handleSubmit()
    }
  }
  handleSearchClick = event => {
    event.preventDefault()
    event.stopPropagation()
    this.props.onSubmit()
  }
  render () {
    const { submitting, handleSubmit, placeholder, disabled } = this.props

    return (
      <Form onKeyPress={this.handleKeyPress} onSubmit={handleSubmit}>
        <FormRow styleName='form-row'>
          <div styleName='toolbar'>
            {/* <Field
              name='entityType'
              component={DropdownField}
              items={searchConstants.SEARCH_ENTITY_DROPDOWN_OPTIONS}
              compact
            /> */}
            <IconButton
              icon={SearchIcon}
              onClick={this.handleSearchClick}
              aria-label='Search'
              styleName='search-button'
            />
          </div>
          <Field
            name='term'
            component={SearchField}
            searchInProgress={submitting}
            autoFocus={false}
            disabled={disabled}
            placeholder={placeholder}
            maxLength={constraints.QUICKSEARCH.term.length.maximum}
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
