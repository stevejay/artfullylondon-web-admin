import React from 'react'
import PropTypes from 'prop-types'

import ShouldNeverUpdateComponent
  from '_src/shared/components/base-class/should-never-update'
import './summary.scss'

class Summary extends ShouldNeverUpdateComponent {
  render () {
    const { children, ...rest } = this.props
    return <p {...rest} styleName='summary'>{children}</p>
  }
}

Summary.propTypes = {
  children: PropTypes.any.isRequired
}

export default Summary
