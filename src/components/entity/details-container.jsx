import React from 'react'
import PropTypes from 'prop-types'
import './details-container.scss'

const DetailsContainer = ({ type, ...rest }) => (
  <div {...rest} styleName={`container-${type}`} />
)

DetailsContainer.propTypes = {
  children: PropTypes.any.isRequired,
  type: PropTypes.oneOf(['default', 'narrow'])
}

DetailsContainer.defaultProps = {
  type: 'default'
}

export default DetailsContainer
