import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Loader from '_src/components/loader'
import SectionHeading from '_src/components/section/heading'
import SectionsContainer from '_src/components/section/sections-container'
import BasicSection from '_src/components/section/basic'
import CopyrightFooter from '_src/components/copyright-footer'
import StatisticCollection from '_src/components/statistic/collection'
import * as searchActions from '_src/actions/search'
import * as statusActions from '_src/actions/status'

export class DashboardPage extends React.Component {
  componentDidMount () {
    this.props.getEntityCounts()
  }
  render () {
    // const {
    //   entityCounts,
    //   getEntityCountsInProgress,
    //   getEntityCountsFailed
    // } = this.props

    // const showEntityCounts =
    //   !getEntityCountsInProgress &&
    //   !getEntityCountsFailed &&
    //   entityCounts.length > 0

    return 'Foo'

    return (
      <BasicSection>
        <SectionHeading>
          Admin <span>Dashboard</span>
        </SectionHeading>
        {getEntityCountsInProgress && <Loader size='massive' />}
        {showEntityCounts &&
          <StatisticCollection entityCounts={entityCounts} />}
      </BasicSection>
    )
  }
}

DashboardPage.propTypes = {
  entityCounts: PropTypes.array,
  // getEntityCountsInProgress: PropTypes.bool.isRequired,
  // getEntityCountsFailed: PropTypes.bool.isRequired,
  // showQuicksearch: PropTypes.bool.isRequired,
  pushBasicSearchToUrl: PropTypes.func.isRequired,
  clearAutocomplete: PropTypes.func.isRequired,
  getEntityCounts: PropTypes.func.isRequired
}

export default connect(
  null,
  // state => ({
  //   entityCounts: state.status.entityCounts,
  //   getEntityCountsInProgress: state.status.getEntityCountsInProgress,
  //   getEntityCountsFailed: state.status.getEntityCountsFailed
  // }),
  dispatch => ({
    pushBasicSearchToUrl: bindActionCreators(
      searchActions.pushBasicSearchToUrl,
      dispatch
    ),
    clearAutocomplete: bindActionCreators(
      searchActions.clearAutocomplete,
      dispatch
    ),
    getEntityCounts: bindActionCreators(
      statusActions.getEntityCounts,
      dispatch
    )
  })
)(DashboardPage)
