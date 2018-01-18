import React from 'react'
import PropTypes from 'prop-types'

import './footer.scss'

const PageFooter = ({ className, children }) =>
  (children
    ? <footer className={className} styleName='page-footer'>{children}</footer>
    : null)

/* istanbul ignore next */
PageFooter.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any
}

export default PageFooter
