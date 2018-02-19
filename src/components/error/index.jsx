import React from 'react'
import PropTypes from 'prop-types'
import ThumbsDownIcon from 'react-icons/lib/fa/thumbs-o-down'
import _ from 'lodash'

import BasicSection from '_src/components/section/basic'
import errorType from '_src/domain/types/error-type'
import './index.scss'

const Error = ({ type }) => {
  const text = type === errorType.NOT_FOUND
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
  type: PropTypes.oneOf(_.values(errorType))
}

Error.defaultProps = {
  type: errorType.DEFAULT
}

export default Error
