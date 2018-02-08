import React from 'react'
import PropTypes from 'prop-types'

import ShouldNeverUpdateComponent
  from '_src/components/base-class/should-never-update'
import GridRow from '_src/components/grid/row'
import * as dateLib from '_src/lib/date'

class TimesRangeEntry extends ShouldNeverUpdateComponent {
  render () {
    const { value, onDelete } = this.props

    return (
      <GridRow id={value.id} onDelete={onDelete}>
        {dateLib.formatDateRangeForDisplay(value.dateFrom, value.dateTo)}
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
