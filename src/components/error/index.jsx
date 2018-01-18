import React from 'react'
import PropTypes from 'prop-types'
import ThumbsDownIcon from 'react-icons/lib/fa/thumbs-o-down'

import BasicSection from '_src/components/section/basic'
import './index.scss'

const Error = ({ type }) => {
  const text = type === 'notfound'
    ? 'Sorry\u2014we couldn\u0027t find this'
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
  type: PropTypes.oneOf(['default', 'notfound'])
}

Error.defaultProps = {
  type: 'default'
}

export default Error
