import React from 'react'
import PropTypes from 'prop-types'

import './header.scss'

const PageHeader = props => (
  <header styleName='page-header' role='banner' {...props} />
)

PageHeader.propTypes = {
  children: PropTypes.any
}

export default PageHeader
