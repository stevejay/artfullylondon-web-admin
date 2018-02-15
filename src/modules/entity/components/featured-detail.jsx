import React from 'react'
import PropTypes from 'prop-types'

import FeaturedDetailHeading from './featured-detail-heading'
import FeaturedDetailContent from './featured-detail-content'
import './featured-detail.scss'

const EntityFeaturedDetail = ({ heading, children }) => (
  <div styleName='container'>
    <FeaturedDetailHeading>{heading}</FeaturedDetailHeading>
    <FeaturedDetailContent>{children}</FeaturedDetailContent>
  </div>
)

EntityFeaturedDetail.propTypes = {
  heading: PropTypes.any.isRequired,
  children: PropTypes.any.isRequired
}

export default EntityFeaturedDetail
