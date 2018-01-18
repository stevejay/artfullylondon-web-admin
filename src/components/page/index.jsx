import React from 'react'
import PropTypes from 'prop-types'

import './index.scss'

const Page = ({ className, children }) =>
  (children
    ? <div className={className} styleName='page'>{children}</div>
    : null)

Page.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any
}

export default Page
