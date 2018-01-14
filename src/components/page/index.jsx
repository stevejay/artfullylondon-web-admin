import React from 'react'
import PropTypes from 'prop-types'

import './index.scss'

const Page = props => <div styleName='page' {...props} />

Page.propTypes = {
  children: PropTypes.any
}

export default Page
