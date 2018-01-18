import React from 'react'
import PropTypes from 'prop-types'

import './heading.scss'

const SectionHeading = ({ className, children, logo }) => {
  const hasLogo = !!logo

  return (
    <div
      className={className}
      styleName={`container${hasLogo ? '-logo' : '-no-logo'}`}
    >
      {!!logo && React.createElement(logo, { styleName: 'icon' })}
      <h2 styleName='title'>{children}</h2>
    </div>
  )
}

SectionHeading.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any.isRequired,
  logo: PropTypes.func
}

export default SectionHeading
