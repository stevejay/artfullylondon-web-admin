import React from 'react'
import PropTypes from 'prop-types'

import './footer.scss'

const Footer = props => <footer styleName='page-footer' {...props} />

Footer.propTypes = {
  children: PropTypes.any
}

export default Footer
