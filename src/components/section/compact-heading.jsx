import React from 'react'
import PropTypes from 'prop-types'
import './compact-heading.m.scss'

const CompactHeadingSection = props => <h1 {...props} styleName='heading' />

CompactHeadingSection.propTypes = {
  children: PropTypes.any.isRequired
}

export default CompactHeadingSection
