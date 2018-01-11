import React from 'react'
import PropTypes from 'prop-types'

import Loader from '_src/components/loader'
import './panel.scss'

const Panel = props => {
  return (
    <div styleName='container'>
      <Loader {...props} />
    </div>
  )
}

Panel.propTypes = {
  size: PropTypes.oneOf([
    'tiny',
    'small',
    'medium',
    'large',
    'massive',
    'modal'
  ]).isRequired,
  type: PropTypes.oneOf(['default', 'inverse'])
}

Panel.defaultProps = {
  type: 'default'
}

export default Panel
