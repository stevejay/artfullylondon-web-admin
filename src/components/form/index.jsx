import React from 'react'
import PropTypes from 'prop-types'

import './index.scss'

class Form extends React.Component {
  handleSubmit = event => {
    event.stopPropagation()
    return this.props.onSubmit(event)
  }
  render () {
    const { children, onSubmit, className, ...rest } = this.props

    return (
      <form
        {...rest}
        onSubmit={this.handleSubmit}
        styleName='form'
        className={className}
      >
        {children}
      </form>
    )
  }
}

Form.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  onSubmit: PropTypes.func.isRequired
}

export default Form
