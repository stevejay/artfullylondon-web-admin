import React from 'react'
import PropTypes from 'prop-types'
import { withStateHandlers } from 'recompose'
import _ from 'lodash'

import Loader from '_src/shared/components/loader'
import Message from '_src/shared/components/message'
import FormRow from '_src/shared/components/form/row'
import FieldContainer from '_src/shared/components/field/container'
import FieldBorder from '_src/shared/components/field/border'
import FieldDivider from '_src/shared/components/field/divider'
import SearchInput from '_src/shared/components/search-input'
import { VALUES as entityTypeValues } from '_src/domain/types/entity-type'
import './entity-selector-field.scss'

class EntitySelectorField extends React.Component {
  shouldComponentUpdate (nextProps) {
    return (
      nextProps.input.value !== this.props.input.value ||
      nextProps.gettingEntity !== this.props.gettingEntity ||
      nextProps.inputValue !== this.props.inputValue
    )
  }
  handleAutocompleteSearch = ({ term }) => {
    return this.props.onAutocompleteSearch(term, this.props.entityType)
  }
  handleAutocompleteSelect = item => {
    const {
      entityType,
      setInputValue,
      setGettingEntity,
      onAutocompleteSelect
    } = this.props

    setGettingEntity(true)

    onAutocompleteSelect(entityType, item.id)
      .then(() => {
        setInputValue('')
      })
      .finally(() => {
        setGettingEntity(false)
      })
  }
  handleChange = event => {
    this.props.setInputValue(event.target.value)
  }
  render () {
    const {
      entityType,
      label,
      input: { value },
      meta: { error, touched },
      required,
      gettingEntity,
      inputValue
    } = this.props

    const hasEntity = !_.isEmpty(value)
    const inputHtmlId = `sub-entity-search-${entityType}`

    return (
      <FieldContainer
        label={label}
        htmlFor={label}
        required={required}
        error={error}
        touched={touched}
      >
        <FieldBorder styleName='border'>
          {gettingEntity &&
            <Message type='field'>
              <React.Fragment>
                &nbsp;
                <Loader size='medium' />
              </React.Fragment>
            </Message>}
          {!gettingEntity &&
            !hasEntity &&
            <Message type='field' title='None Selected'>
              Search for one below.
            </Message>}
          {!gettingEntity &&
            hasEntity &&
            <Message type='field'>
              <a
                href={`/${entityType}/${value.id}`}
                target='_blank'
                rel='noopener'
              >
                {`${value.name}`}
              </a>
            </Message>}
          <FieldDivider />
          <FormRow>
            <FieldContainer
              styleName='field-container'
              label='Search'
              htmlFor={inputHtmlId}
            >
              <SearchInput
                value={inputValue}
                onChange={this.handleChange}
                searchInProgress={false}
                onAutocompleteSearch={this.handleAutocompleteSearch}
                onAutocompleteSelect={this.handleAutocompleteSelect}
                placeholder='Enter search term...'
                size='small'
                htmlId={inputHtmlId}
              />
            </FieldContainer>
          </FormRow>
        </FieldBorder>
      </FieldContainer>
    )
  }
}

EntitySelectorField.propTypes = {
  entityType: PropTypes.oneOf(entityTypeValues).isRequired,
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({
    value: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string
    }),
    onChange: PropTypes.func.isRequired
  }),
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.any
  }),
  required: PropTypes.bool,
  gettingEntity: PropTypes.bool.isRequired,
  inputValue: PropTypes.string,
  setGettingEntity: PropTypes.func.isRequired,
  setInputValue: PropTypes.func.isRequired,
  onAutocompleteSearch: PropTypes.func.isRequired,
  onAutocompleteSelect: PropTypes.func.isRequired
}

export default withStateHandlers(
  {
    gettingEntity: false,
    inputValue: ''
  },
  {
    setGettingEntity: () => value => ({
      gettingEntity: value
    }),
    setInputValue: () => value => ({ inputValue: value })
  }
)(EntitySelectorField)
