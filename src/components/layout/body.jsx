import React from 'react'
import PropTypes from 'prop-types'
import './body.scss'

const Body = props => <div styleName='container' {...props} />

Body.propTypes = {
  children: PropTypes.any
}

export default Body
