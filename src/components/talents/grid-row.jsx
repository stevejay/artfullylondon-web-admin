import React from 'react'
import PropTypes from 'prop-types'
import Text from '_src/components/text'
import { formatTalentName } from '_src/lib/talent'
import GridRow from '_src/components/grid/row'
import './grid-row.m.scss'

class TalentsGridRow extends React.Component {
  shouldComponentUpdate (nextProps) {
    return nextProps.value !== this.props.value
  }
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
            {value.name || formatTalentName(value)}
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
