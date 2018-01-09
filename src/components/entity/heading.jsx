import React from 'react'
import PropTypes from 'prop-types'
import './Heading.m.scss'

const EntityHeading = ({ children }) => <h1 styleName='heading'>{children}</h1>

EntityHeading.propTypes = {
  children: PropTypes.any.isRequired
}

export default EntityHeading
