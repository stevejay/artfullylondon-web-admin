import React from 'react'
import PropTypes from 'prop-types'
import GridRow from '_src/components/grid/row'
import { formatDateRangeForDisplay } from '_src/lib/time'

class TimesRangeEntry extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    const { value, onDelete } = this.props

    return (
      <GridRow id={value.id} onDelete={onDelete}>
        {formatDateRangeForDisplay(value.dateFrom, value.dateTo)}
        {value.label && <em>&nbsp;({value.label})</em>}
      </GridRow>
    )
  }
}

TimesRangeEntry.propTypes = {
  value: PropTypes.shape({
    id: PropTypes.string.isRequired,
    dateFrom: PropTypes.string.isRequired,
    dateTo: PropTypes.string.isRequired,
    label: PropTypes.string
  }).isRequired,
  onDelete: PropTypes.func
}

export default TimesRangeEntry
