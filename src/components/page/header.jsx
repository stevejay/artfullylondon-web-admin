import React from 'react'
import PropTypes from 'prop-types'

import './header.scss'

const PageHeader = ({ className, children }) =>
  (children
    ? <header className={className} styleName='page-header' role='banner'>
      {children}
    </header>
    : null)

PageHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any
}

export default PageHeader
