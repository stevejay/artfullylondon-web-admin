import React from 'react'
import PropTypes from 'prop-types'
import './column-layout.m.scss'

const EntityColumnLayout = props => <div styleName='container' {...props} />

EntityColumnLayout.propTypes = {
  children: PropTypes.any
}

export default EntityColumnLayout
