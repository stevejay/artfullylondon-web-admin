import React from 'react'
import PropTypes from 'prop-types'

import Text from '_src/shared/components/text'
import GridRow from '_src/shared/components/grid/row'
import './talents-grid-row.scss'

class TalentsGridRow extends React.PureComponent {
  handleRolesChange = event => {
    this.props.onRolesChange(this.props.value.key, event.target.value)
  }
  handleCharactersChange = event => {
    this.props.onCharactersChange(this.props.value.key, event.target.value)
  }
  render () {
    const { value, onDelete } = this.props

    return (
      <GridRow id={value.key} onDelete={onDelete}>
        <div styleName='first-row'>
          <a href={`/talent/${value.id}`} target='_blank' rel='noopener'>
            {value.name || `${value.firstNames} ${value.lastName}`}
          </a>
        </div>
        <Text
          value={value.roles}
          onChange={this.handleRolesChange}
          maxLength={100}
          placeholder='Roles'
          forceSingleLine
          style={{ marginBottom: '.5rem' }}
        />
        <Text
          value={value.characters}
          onChange={this.handleCharactersChange}
          maxLength={100}
          placeholder='Characters'
          forceSingleLine
        />
      </GridRow>
    )
  }
}

TalentsGridRow.propTypes = {
  value: PropTypes.shape({
    key: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    talentType: PropTypes.string.isRequired,
    roles: PropTypes.string.isRequired,
    characters: PropTypes.string.isRequired,
    firstNames: PropTypes.string,
    lastName: PropTypes.string,
    name: PropTypes.string
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onRolesChange: PropTypes.func.isRequired,
  onCharactersChange: PropTypes.func.isRequired
}

export default TalentsGridRow
