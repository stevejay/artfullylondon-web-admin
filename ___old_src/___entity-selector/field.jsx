import React from 'react'
import PropTypes from 'prop-types'
import Message from '_src/components/message'
import FieldContainer from '_src/components/field/container'
import Loader from '_src/components/loader'
import FieldBorder from '_src/components/field/border'
import FieldDivider from '_src/components/field/divider'
import {
  ENTITY_TYPE_EVENT,
  ENTITY_TYPE_VENUE,
  ENTITY_TYPE_EVENT_SERIES
} from '_src/constants/entity'
import EntitySelectorSearch from '_src/components/entity-selector/search'
import './field.scss'

class EntitySelectorField extends React.Component {
  handleSelectEntity = result => {
    const { entityType, getSubEntity, parentFormName } = this.props

    getSubEntity({
      entityType: ENTITY_TYPE_EVENT,
      subEntityType: entityType,
      id: result.id,
      parentFormName
    })
  }
  render () {
    const {
      entityType,
      label,
      required,
      input: { value },
      meta: { error, touched },
      entityDetailsUrlTemplate,
      entityDetailsFormatter,
      entitySearchLabel,
      getEntityInProgress
    } = this.props

    const hasEntity = !!value && !!value.id
    const viewEntityUrl = entityDetailsUrlTemplate.replace('{id}', value.id)

    return (
      <FieldContainer
        label={label}
        htmlFor={label}
        required={required}
        error={error}
        touched={touched}
      >
        <FieldBorder>
          {getEntityInProgress &&
            <div styleName='loader-container'>
              <Loader size='medium' />
            </div>}
          {!getEntityInProgress &&
            !hasEntity &&
            <Message
              type='field'
              title='None Selected'
              message='Search for one below.'
            />}
          {!getEntityInProgress &&
            hasEntity &&
            <Message
              type='field'
              title={
                <a href={viewEntityUrl} target='_blank' rel='noopener'>
                  {`${value.name}`}
                </a>
              }
            >
              {entityDetailsFormatter(value)}
            </Message>}
          <FieldDivider />
          <EntitySelectorSearch
            entityType={entityType}
            onSelectEntity={this.handleSelectEntity}
            entitySearchLabel={entitySearchLabel}
          />
        </FieldBorder>
      </FieldContainer>
    )
  }
}

EntitySelectorField.propTypes = {
  entityType: PropTypes.oneOf([ENTITY_TYPE_VENUE, ENTITY_TYPE_EVENT_SERIES])
    .isRequired,
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({
    value: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string
    }).isRequired,
    onChange: PropTypes.func.isRequired
  }),
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.any
  }),
  required: PropTypes.bool.isRequired,
  getSubEntity: PropTypes.func.isRequired,
  entityDetailsUrlTemplate: PropTypes.string.isRequired,
  entityDetailsFormatter: PropTypes.func.isRequired,
  entitySearchLabel: PropTypes.string.isRequired,
  parentFormName: PropTypes.string.isRequired,
  getEntityInProgress: PropTypes.bool.isRequired
}

export default EntitySelectorField
