import React from 'react'
import PropTypes from 'prop-types'

import './item.scss'

const ToolbarItem = ({ className, children }) =>
  (children
    ? <div className={className} styleName='toolbar-item'>
      {children}
    </div>
    : null)

ToolbarItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any
}

export default ToolbarItem
