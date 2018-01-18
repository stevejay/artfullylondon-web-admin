import React from 'react'
import PropTypes from 'prop-types'

import BasicSection from '_src/components/section/basic'
import './index.scss'

const Error = ({ statusCode }) => {
  const text = statusCode === 404 ? 'Page Not Found' : 'Server Error'

  return (
    <BasicSection styleName='section'>
      <h1 styleName='heading'>
        <span styleName='code'>{statusCode}</span>{text}
      </h1>
    </BasicSection>
  )
}

/* istanbul ignore next */
Error.propTypes = {
  statusCode: PropTypes.number
}

/* istanbul ignore next */
Error.defaultProps = {
  statusCode: 500
}

export default Error
