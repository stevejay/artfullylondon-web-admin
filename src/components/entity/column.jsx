import React from 'react'
import PropTypes from 'prop-types'

import './column.scss'

const EntityColumn = props => <div styleName='container' {...props} />

EntityColumn.propTypes = {
  children: PropTypes.any
}

export default EntityColumn
