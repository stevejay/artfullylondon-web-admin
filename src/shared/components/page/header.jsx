import React from 'react'
import PropTypes from 'prop-types'

import './header.scss'

const PageHeader = ({ className, children }) => (
  <header className={className} styleName='page-header' role='banner'>
    {children}
  </header>
)

PageHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any.isRequired
}

export default PageHeader
