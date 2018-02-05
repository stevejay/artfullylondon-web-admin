import React from 'react'
import PropTypes from 'prop-types'

import Grid from '_src/components/grid'
import FieldContainer from '_src/components/field/container'
import FieldBorder from '_src/components/field/border'
import TalentsGridRow from '_src/components/talents/grid-row'
import * as arrayLib from '_src/lib/array'

class TalentsField extends React.Component {
  shouldComponentUpdate (nextProps) {
    return (
      nextProps.input.value !== this.props.input.value ||
      nextProps.meta.touched !== this.props.meta.touched ||
      nextProps.meta.error !== this.props.meta.error
    )
  }
  handleDelete = key => {
    const { input: { value, onChange } } = this.props
    const newValue = arrayLib.removeElementByKey(value, key)
    onChange(newValue)
  }
  handleRolesChange = (key, roles) => {
    const { input: { value, onChange } } = this.props
    const newValue = arrayLib.updateElementByKey(value, key, { roles })
    onChange(newValue)
  }
  handleCharactersChange = (key, characters) => {
    const { input: { value, onChange } } = this.props
    const newValue = arrayLib.updateElementByKey(value, key, { characters })
    onChange(newValue)
  }
  render () {
    const {
      label,
      input: { value },
      meta: { touched, error },
      containerStyle
    } = this.props

    return (
      <FieldContainer
        label={label}
        htmlFor={label}
        error={error}
        touched={touched}
        style={containerStyle}
      >
        <FieldBorder>
          <Grid>
            {value.map(element => (
              <TalentsGridRow
                key={element.key}
                value={element}
                onDelete={this.handleDelete}
                onRolesChange={this.handleRolesChange}
                onCharactersChange={this.handleCharactersChange}
              />
            ))}
          </Grid>
        </FieldBorder>
      </FieldContainer>
    )
  }
}

TalentsField.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({
    value: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        talentType: PropTypes.string.isRequired,
        roles: PropTypes.string.isRequired,
        characters: PropTypes.string.isRequired,
        firstNames: PropTypes.string,
        lastName: PropTypes.string,
        name: PropTypes.string
      }).isRequired
    ).isRequired,
    onChange: PropTypes.func.isRequired
  }),
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.any
  }),
  containerStyle: PropTypes.object
}

export default TalentsField
