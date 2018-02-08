import React from 'react'
import PropTypes from 'prop-types'

import './details-container.scss'

const EntityDetailsContainer = ({ type, ...rest }) => (
  <div {...rest} styleName={`container-${type}`} />
)

EntityDetailsContainer.propTypes = {
  children: PropTypes.any.isRequired,
  type: PropTypes.oneOf(['default', 'narrow'])
}

EntityDetailsContainer.defaultProps = {
  type: 'default'
}

export default EntityDetailsContainer
