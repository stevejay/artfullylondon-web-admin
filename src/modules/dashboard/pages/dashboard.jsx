import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Error from '_src/components/error'
import BoxesLoader from '_src/components/loader/boxes'
import SectionHeading from '_src/components/section/heading'
import BasicSection from '_src/components/section/basic'
// import StatisticCollection from '_src/components/statistic/collection'
import * as searchActions from '_src/actions/search'
import * as statusActions from '_src/actions/status'

export class DashboardPage extends React.Component {
  componentDidMount () {
    this.props.getEntityCounts()
  }
  render () {
    const { entityCounts, getInProgress, getFailed } = this.props

    return (
      <BasicSection>
        <SectionHeading>
          Admin <span>Dashboard</span>
        </SectionHeading>
        {false && getInProgress && <BoxesLoader />}
        {(true || getFailed) && <Error />}
        {false && !getInProgress && !getFailed && 'Foo'}
        {/* <StatisticCollection entityCounts={entityCounts} />} */}
      </BasicSection>
    )
  }
}

DashboardPage.propTypes = {
  entityCounts: PropTypes.array,
  getInProgress: PropTypes.bool.isRequired,
  getFailed: PropTypes.bool.isRequired,
  pushBasicSearchToUrl: PropTypes.func.isRequired,
  clearAutocomplete: PropTypes.func.isRequired,
  getEntityCounts: PropTypes.func.isRequired
}

export default connect(
  state => ({
    entityCounts: state.status.entityCounts,
    getInProgress: state.status.getEntityCountsInProgress,
    getFailed: state.status.getEntityCountsFailed
  }),
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
