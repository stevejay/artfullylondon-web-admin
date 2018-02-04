import React from 'react'
import PropTypes from 'prop-types'

import './footer.scss'

const PageFooter = ({ className, children }) => (
  <footer className={className} styleName='page-footer'>{children}</footer>
)

PageFooter.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any.isRequired
}

export default PageFooter
