import React from 'react'
import PropTypes from 'prop-types'

import './main.scss'

const PageMain = props => <main styleName='page-main' {...props} />

PageMain.propTypes = {
  children: PropTypes.any
}

export default PageMain
