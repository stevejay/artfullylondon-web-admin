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
import { clearAutocomplete, pushBasicSearchToUrl } from '_src/actions/search'
import { getEntityCounts } from '_src/actions/status'
import './index.m.scss'

const sampleData = [
  { id: '5fbmzmtc', x: 7, y: 41, z: 6 },
  { id: 's4f8phwm', x: 11, y: 45, z: 9 }
]

class Home extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      disabled: false,
      data: sampleData,
      domain: { x: [0, 30], y: [0, 100] }
    }
  }
  componentWillMount () {
    this.props.getEntityCounts()
  }
  render () {
    const {
      entityCounts,
      getEntityCountsInProgress,
      getEntityCountsFailed
    } = this.props

    const showEntityCounts =
      !getEntityCountsInProgress &&
      !getEntityCountsFailed &&
      entityCounts.length > 0

    return (
      <SectionsContainer>
        <BasicSection style={{ flexGrow: 1 }}>
          <SectionHeading>
            Admin <span>Dashboard</span>
          </SectionHeading>
          {getEntityCountsInProgress && <Loader size='massive' />}
          {showEntityCounts &&
            <StatisticCollection entityCounts={entityCounts} />}
        </BasicSection>
        <BasicSection style={{ flexGrow: 0 }}>
          <CopyrightFooter />
        </BasicSection>
      </SectionsContainer>
    )
  }
}

Home.propTypes = {
  entityCounts: PropTypes.array,
  getEntityCountsInProgress: PropTypes.bool.isRequired,
  getEntityCountsFailed: PropTypes.bool.isRequired,
  showQuicksearch: PropTypes.bool.isRequired,
  pushBasicSearchToUrl: PropTypes.func.isRequired,
  clearAutocomplete: PropTypes.func.isRequired,
  getEntityCounts: PropTypes.func.isRequired
}

export default connect(
  state => ({
    showQuicksearch: state.modal.showQuicksearch,
    entityCounts: state.status.entityCounts,
    getEntityCountsInProgress: state.status.getEntityCountsInProgress,
    getEntityCountsFailed: state.status.getEntityCountsFailed
  }),
  dispatch => ({
    pushBasicSearchToUrl: bindActionCreators(pushBasicSearchToUrl, dispatch),
    clearAutocomplete: bindActionCreators(clearAutocomplete, dispatch),
    getEntityCounts: bindActionCreators(getEntityCounts, dispatch)
  })
)(Home)
