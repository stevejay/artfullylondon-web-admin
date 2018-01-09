import React from 'react'
import PropTypes from 'prop-types'
import './heading.m.scss'

class Heading extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    const { id, children, ...rest } = this.props
    return <h3 {...rest} id={id} styleName='heading'>{children}</h3>
  }
}

Heading.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired
}

export default Heading
