import React from 'react'
import PropTypes from 'prop-types'
import './facets.m.scss'

class Facets extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    const { children, ...rest } = this.props
    return <div {...rest} styleName='facets'>{children}</div>
  }
}

Facets.propTypes = {
  children: PropTypes.any.isRequired
}

export default Facets
