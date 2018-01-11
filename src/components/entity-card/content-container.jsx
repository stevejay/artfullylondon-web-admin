import React from 'react'
import PropTypes from 'prop-types'
import './content-container.scss'

class ContentContainer extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    const { children, ...rest } = this.props
    return <div {...rest} styleName='container'>{children}</div>
  }
}

ContentContainer.propTypes = {
  children: PropTypes.any.isRequired
}

export default ContentContainer
