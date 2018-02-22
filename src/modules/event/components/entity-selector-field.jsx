import React from 'react'
import PropTypes from 'prop-types'
import { withState } from 'recompose'

import Loader from '_src/shared/components/loader'
import FieldContainer from '_src/shared/components/field/container'
import FieldBorder from '_src/shared/components/field/border'
import entityType from '_src/domain/types/entity-type'

class EntitySelectorField extends React.Component {
  render () {
    const {
      // entityType,
      label,
      // input: { value },
      meta: { error, touched },
      required,
      gettingEntity
    } = this.props

    // const hasEntity = !!value

    return (
      <FieldContainer
        label={label}
        htmlFor={label}
        required={required}
        error={error}
        touched={touched}
      >
        <FieldBorder>
          {gettingEntity && <Loader size='medium' />}
        </FieldBorder>
      </FieldContainer>
    )
  }
}

EntitySelectorField.propTypes = {
  entityType: PropTypes.oneOf(entityType.VALUES).isRequired,
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
  getSubEntity: PropTypes.func.isRequired,
  parentFormName: PropTypes.string.isRequired,
  gettingEntity: PropTypes.bool.isRequired
}

export default withState('gettingEntity', 'setGettingEntity', false)(
  EntitySelectorField
)
