import React from 'react'
import PropTypes from 'prop-types'
import { shouldUpdate } from 'recompose'

import './index.scss'

const NoEntries = ({ message }) => <div styleName='container'>{message}</div>

NoEntries.propTypes = {
  message: PropTypes.string.isRequired
}

NoEntries.defaultProps = {
  message: 'No Entries'
}

export default shouldUpdate(() => false)(NoEntries)
