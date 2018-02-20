import React from 'react'
import PropTypes from 'prop-types'

import ShouldNeverUpdateComponent
  from '_src/shared/components/base-class/should-never-update'
import './content-container.scss'

class ContentContainer extends ShouldNeverUpdateComponent {
  render () {
    const { children, ...rest } = this.props
    return <div {...rest} styleName='container'>{children}</div>
  }
}

ContentContainer.propTypes = {
  children: PropTypes.any.isRequired
}

export default ContentContainer
