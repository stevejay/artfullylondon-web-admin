import React from 'react'
import PropTypes from 'prop-types'

import './index.scss'

const Toolbar = ({ className, children }) => (
  <div className={className} styleName='toolbar' role='menubar'>
    {children}
  </div>
)

Toolbar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any
}

export default Toolbar
