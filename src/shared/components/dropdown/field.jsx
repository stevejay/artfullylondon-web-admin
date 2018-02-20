import React from 'react'
import PropTypes from 'prop-types'

import Dropdown from '_src/shared/components/dropdown'

const DropdownField = ({ input: { value, onChange }, items, compact }) => (
  <Dropdown value={value} onChange={onChange} items={items} compact={compact} />
)

DropdownField.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
  }).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  compact: PropTypes.bool
}

export default DropdownField
