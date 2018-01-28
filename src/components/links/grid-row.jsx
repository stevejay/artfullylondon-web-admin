import React from 'react'
import PropTypes from 'prop-types'

import GridRow from '_src/components/grid/row'
import * as linkConstants from '_src/constants/link'

const LinkGridRow = ({ value: { type, url }, onDelete }) => (
  <GridRow id={type} onDelete={onDelete}>
    <a href={url} target='_blank' rel='noopener'>
      {type}
    </a>
  </GridRow>
)

LinkGridRow.propTypes = {
  value: PropTypes.shape({
    type: PropTypes.oneOf(linkConstants.ALLOWED_LINK_TYPES).isRequired,
    url: PropTypes.string.isRequired
  }).isRequired,
  onDelete: PropTypes.func
}

export default LinkGridRow
