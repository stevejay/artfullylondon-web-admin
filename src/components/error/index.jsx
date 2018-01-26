import React from 'react'
import PropTypes from 'prop-types'
import ThumbsDownIcon from 'react-icons/lib/fa/thumbs-o-down'

import BasicSection from '_src/components/section/basic'
import * as errorConstants from '_src/constants/error'
import './index.scss'

const Error = ({ type }) => {
  const text = type === errorConstants.NOT_FOUND
    ? 'Sorry\u2014we couldn\u0027t find that info'
    : 'Oops\u2014something went wrong'

  return (
    <BasicSection styleName='section'>
      <h1 styleName='heading'>
        <ThumbsDownIcon styleName='icon' />{text}
      </h1>
    </BasicSection>
  )
}

Error.propTypes = {
  type: PropTypes.oneOf(errorConstants.ALLOWED_ERROR_TYPES)
}

Error.defaultProps = {
  type: errorConstants.DEFAULT
}

export default Error
