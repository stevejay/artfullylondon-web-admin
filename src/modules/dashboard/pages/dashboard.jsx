import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Error from '_src/components/error'
import BoxesLoader from '_src/components/loader/boxes'
import SectionHeading from '_src/components/section/heading'
import BasicSection from '_src/components/section/basic'
import StatisticCollection
  from '_src/modules/dashboard/components/statistic/collection'
import * as statusActionTypes from '_src/constants/action/status'

export class DashboardPage extends React.Component {
  componentWillMount () {
    this.props.dispatch({ type: statusActionTypes.GET_ENTITY_COUNTS })
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
  entityCounts: PropTypes.array,
  getInProgress: PropTypes.bool.isRequired,
  getFailed: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect(
  /* istanbul ignore next */
  state => ({
    entityCounts: state.status.entityCounts,
    getInProgress: state.status.getEntityCountsInProgress,
    getFailed: state.status.getEntityCountsFailed
  })
)(DashboardPage)
