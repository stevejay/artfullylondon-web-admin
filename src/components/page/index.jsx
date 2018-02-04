import React from 'react'
import PropTypes from 'prop-types'

import './index.scss'

const Page = ({ className, children }) => (
  <div className={className} styleName='page'>{children}</div>
)

Page.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any.isRequired
}

export default Page
