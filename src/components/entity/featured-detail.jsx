import React from 'react'
import PropTypes from 'prop-types'

import FeaturedDetailHeading
  from '_src/components/entity/featured-detail-heading'
import FeaturedDetailContent
  from '_src/components/entity/featured-detail-content'
import './featured-detail.scss'

const FeaturedDetail = ({ heading, children }) => (
  <div styleName='container'>
    <FeaturedDetailHeading>{heading}</FeaturedDetailHeading>
    <FeaturedDetailContent>{children}</FeaturedDetailContent>
  </div>
)

FeaturedDetail.propTypes = {
  heading: PropTypes.any.isRequired,
  children: PropTypes.any.isRequired
}

export default FeaturedDetail
