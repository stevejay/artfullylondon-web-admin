import React from 'react'
import PropTypes from 'prop-types'
import { withState } from 'recompose'

import FormRow from '_src/shared/components/form/row'
import FieldContainer from '_src/shared/components/field/container'
import SearchInput from '_src/shared/components/search-input'
import { VALUES as entityTypeValues } from '_src/domain/types/entity-type'
import './entity-selector-search.scss'

export class EntitySelectorSearch extends React.Component {
  shouldComponentUpdate (nextProps) {
    return nextProps.inputValue !== this.props.inputValue
  }
  handleAutocompleteSearch = ({ term }) => {
    return this.props.onAutocompleteSearch(term, this.props.entityType)
  }
  handleAutocompleteSelect = item => {
    const { entityType, setInputValue, onAutocompleteSelect } = this.props

    onAutocompleteSelect(entityType, item.id, item).then(() => {
      setInputValue('')
    })
  }
  handleChange = event => {
    this.props.setInputValue(event.target.value)
  }
  render () {
    const { entityType, inputValue } = this.props
    const inputHtmlId = `sub-entity-search-${entityType}`

    return (
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
    )
  }
}

EntitySelectorSearch.propTypes = {
  entityType: PropTypes.oneOf(entityTypeValues).isRequired,
  inputValue: PropTypes.string,
  setInputValue: PropTypes.func.isRequired,
  onAutocompleteSearch: PropTypes.func.isRequired,
  onAutocompleteSelect: PropTypes.func.isRequired
}

export default withState('inputValue', 'setInputValue', '')(
  EntitySelectorSearch
)
