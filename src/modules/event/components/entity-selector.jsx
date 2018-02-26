import React from 'react'
import PropTypes from 'prop-types'
import { withState } from 'recompose'
import _ from 'lodash'

import Loader from '_src/shared/components/loader'
import Message from '_src/shared/components/message'
import FieldContainer from '_src/shared/components/field/container'
import FieldBorder from '_src/shared/components/field/border'
import FieldDivider from '_src/shared/components/field/divider'
import EntitySelectorSearch from './entity-selector-search'
import { VALUES as entityTypeValues } from '_src/domain/types/entity-type'
import './entity-selector.scss'

class EntitySelector extends React.Component {
  shouldComponentUpdate (nextProps) {
    return (
      nextProps.value !== this.props.value ||
      nextProps.gettingEntity !== this.props.gettingEntity
    )
  }
  handleAutocompleteSelect = (entityType, id, item) => {
    const { setGettingEntity, onAutocompleteSelect } = this.props

    setGettingEntity(true)

    // TODO change to finally()
    return onAutocompleteSelect(entityType, id, item)
      .then(() => {
        setGettingEntity(false)
      })
      .catch(() => {
        setGettingEntity(false)
      })
  }
  render () {
    const {
      entityType,
      label,
      value,
      error,
      touched,
      required,
      gettingEntity,
      onAutocompleteSearch
    } = this.props

    const hasEntity = !_.isEmpty(value)

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
          <EntitySelectorSearch
            entityType={entityType}
            onAutocompleteSearch={onAutocompleteSearch}
            onAutocompleteSelect={this.handleAutocompleteSelect}
          />
        </FieldBorder>
      </FieldContainer>
    )
  }
}

EntitySelector.propTypes = {
  entityType: PropTypes.oneOf(entityTypeValues).isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string
  }),
  touched: PropTypes.bool.isRequired,
  error: PropTypes.any,
  required: PropTypes.bool,
  gettingEntity: PropTypes.bool.isRequired,
  setGettingEntity: PropTypes.func.isRequired,
  onAutocompleteSearch: PropTypes.func.isRequired,
  onAutocompleteSelect: PropTypes.func.isRequired
}

export default withState('gettingEntity', 'setGettingEntity', false)(
  EntitySelector
)
