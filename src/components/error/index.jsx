import React from 'react'
import PropTypes from 'prop-types'
import BasicSection from '_src/components/section/basic'
import SectionsContainerSection
  from '_src/components/section/sections-container'
import CopyrightFooter from '_src/components/copyright-footer'
import './index.scss'

const Error = ({ statusCode }) => {
  const text = statusCode === 404 ? 'Page Not Found' : 'Server Error'

  return (
    <SectionsContainerSection>
      <BasicSection>
        <div styleName='container'>
          <div styleName='code'>{statusCode}</div>
          <h1 styleName='h1'>{text}</h1>
        </div>
      </BasicSection>
      <CopyrightFooter />
    </SectionsContainerSection>
  )
}

Error.propTypes = {
  statusCode: PropTypes.number
}

Error.defaultProps = {
  statusCode: 500
}

export default Error
