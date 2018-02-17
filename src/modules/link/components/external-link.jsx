import React from 'react'
import PropTypes from 'prop-types'

import './external-link.scss'

const EntityExternalLink = ({ url, icon }) => (
  <a href={url} target='_blank' rel='noopener' styleName='link'>
    {React.createElement(icon, { className: 'icon' })}
  </a>
)

EntityExternalLink.propTypes = {
  url: PropTypes.string.isRequired,
  icon: PropTypes.any.isRequired
}

export default EntityExternalLink
