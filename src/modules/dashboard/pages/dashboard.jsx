import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Error } from '_src/modules/error'
import BoxesLoader from '_src/components/loader/boxes'
import SectionHeading from '_src/components/section/heading'
import BasicSection from '_src/components/section/basic'
import StatisticCollection from '../components/statistic-collection'
import { selectors as dashboardSelectors } from '../reducers'
import * as dashboardActions from '../actions'

export class DashboardPage extends React.PureComponent {
  componentWillMount () {
    this.props.dispatch(dashboardActions.getEntityCounts())
  }
  render () {
    const { entityCounts, getInProgress, getFailed } = this.props

    return (
      <BasicSection>
        <SectionHeading>
          Admin <span>Dashboard</span>
        </SectionHeading>
        {getInProgress && <BoxesLoader />}
        {getFailed && <Error />}
        {!getInProgress &&
          !getFailed &&
          <StatisticCollection entityCounts={entityCounts} />}
      </BasicSection>
    )
  }
}

DashboardPage.propTypes = {
  entityCounts: PropTypes.object.isRequired,
  getInProgress: PropTypes.bool.isRequired,
  getFailed: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect(
  /* istanbul ignore next */
  state => ({
    entityCounts: dashboardSelectors.entityCounts(state),
    getInProgress: dashboardSelectors.gettingEntityCounts(state),
    getFailed: dashboardSelectors.failedToGetEntityCounts(state)
  })
)(DashboardPage)
