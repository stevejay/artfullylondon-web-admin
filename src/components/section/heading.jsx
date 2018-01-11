import React from 'react'
import PropTypes from 'prop-types'
import './heading.scss'

const HeadingSection = ({ children, logo, ...rest }) => {
  const hasLogo = !!logo

  return (
    <div {...rest} styleName={`container${hasLogo ? '-logo' : '-no-logo'}`}>
      {!!logo && React.createElement(logo, { styleName: 'icon' })}
      <h2 styleName='title'>{children}</h2>
    </div>
  )
}

HeadingSection.propTypes = {
  children: PropTypes.any.isRequired,
  logo: PropTypes.func
}

export default HeadingSection
