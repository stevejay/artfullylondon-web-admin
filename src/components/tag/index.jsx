import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'

class Tag extends React.Component {
  shouldComponentUpate (nextProps) {
    return nextProps.tag !== this.props.tag
  }
  render () {
    const { tag, ...rest } = this.props
    const { label } = tag

    return (
      <span {...rest} styleName='container'>
        {label}
      </span>
    )
  }
}

Tag.propTypes = {
  tag: PropTypes.shape({
    label: PropTypes.string.isRequired
  })
}

export default Tag
