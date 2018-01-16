import React from 'react'
import PropTypes from 'prop-types'

import './main.scss'

const PageMain = ({ className, children }) =>
  (children
    ? <main className={className} styleName='page-main'>{children}</main>
    : null)

PageMain.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any
}

export default PageMain
