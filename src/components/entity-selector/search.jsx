import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FieldContainer from '_src/components/field/container'
import FormRow from '_src/components/form/row'
import FormError from '_src/components/form/error'
import {
  ENTITY_TYPE_TALENT,
  ENTITY_TYPE_VENUE,
  ENTITY_TYPE_EVENT_SERIES
} from '_src/constants/entity'
import SearchInput from '_src/components/entity-selector/search-input'
import { autocompleteSearch } from '_src/actions/entity'

export class EntitySelectorSearch extends React.Component {
  handleAutocompleteResultSelect = result => {
    this.handleAutocompleteClear()
    this._search.clearSearchTerm()
    this.props.onSelectEntity(result)
  }
  handleAutocompleteClear = () => {
    // this.props.clearAutocomplete()
  }
  handleAutocompleteSearch = term => {
    const { autocompleteSearch, entityType } = this.props
    autocompleteSearch({ query: { term, entityType } })
  }
  clearSearchTerm () {
    this._search.clearSearchTerm()
  }
  render () {
    const { autocompleteItems, error, entitySearchLabel } = this.props

    return (
      <div>
        <FormRow>
          <FieldContainer label={entitySearchLabel} htmlFor={entitySearchLabel}>
            <SearchInput
              ref={ref => (this._search = ref)}
              searchInProgress={false}
              autocompleteItems={autocompleteItems}
              onAutocompleteResultSelect={this.handleAutocompleteResultSelect}
              onAutocompleteClear={this.handleAutocompleteClear}
              onAutocompleteSearch={this.handleAutocompleteSearch}
              size='small'
            />
          </FieldContainer>
        </FormRow>
        <FormError error={error} />
      </div>
    )
  }
}

EntitySelectorSearch.propTypes = {
  entityType: PropTypes.oneOf([
    ENTITY_TYPE_TALENT,
    ENTITY_TYPE_VENUE,
    ENTITY_TYPE_EVENT_SERIES
  ]).isRequired,
  onSelectEntity: PropTypes.func.isRequired,
  error: PropTypes.any,
  entitySearchLabel: PropTypes.string.isRequired,
  autocompleteItems: PropTypes.array.isRequired,
  autocompleteSearch: PropTypes.func.isRequired
}

export default connect(
  (state, ownProps) => ({
    autocompleteItems: _getAutocompleteItemsForEntityType(
      ownProps.entityType,
      state
    )
  }),
  dispatch => ({
    autocompleteSearch: bindActionCreators(autocompleteSearch, dispatch)
  })
)(EntitySelectorSearch)

function _getAutocompleteItemsForEntityType (entityType, state) {
  switch (entityType) {
    case ENTITY_TYPE_VENUE:
      return state.eventForEdit.venueAutocompleteItems
    case ENTITY_TYPE_TALENT:
      return state.eventForEdit.talentAutocompleteItems
    case ENTITY_TYPE_EVENT_SERIES:
      return state.eventForEdit.eventSeriesAutocompleteItems
    default:
      throw new Error(`entityType out of range: ${entityType}`)
  }
}
