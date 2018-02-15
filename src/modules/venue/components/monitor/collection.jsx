import React from 'react'
import PropTypes from 'prop-types'
import { withState } from 'recompose'
import _ from 'lodash'

import Modal from '_src/components/modal'
import ModalContainer from '_src/components/modal/container'
import FadeTransition from '_src/components/transition/fade'
import UpdateMonitorForm from '_src/modules/venue/forms/update-monitor'
import Loader from '_src/components/loader'
import Button from '_src/components/button'
import Grid from '_src/components/grid'
import { FullVenue } from '_src/entities/venue'
import EntitySectionHeading
  from '_src/modules/entity/components/section-heading'
import './collection.scss'

export class MonitorCollection extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { show: false }
  }
  componentDidMount () {
    const { onMounted } = this.props
    onMounted && onMounted()
  }
  handleShowIgnoredMonitorsClick = () => {
    this.props.setShowIgnoredMonitors(!this.props.showIgnoredMonitors)
  }
  handleEdit = monitor => {
    this.setState({ show: true, editingMonitor: monitor })
  }
  handleHide = () => {
    this.setState({ show: false, editingMonitor: null })
  }
  handleSubmit = values => {
    this.props.onSubmit(values).then(() => this.handleHide())
  }
  render () {
    const {
      title,
      venue,
      monitors: monitorsProp,
      getInProgress,
      gridRowComponent,
      showIgnoredMonitors
    } = this.props

    // TODO clean all this logic up as selectors!

    const { show, editingMonitor } = this.state

    const monitors = _.isArray(monitorsProp)
      ? monitorsProp
      : _.isNil(monitorsProp) ? [] : [monitorsProp]

    const hasIgnoredMonitors = monitors.some(x => x.isIgnored)
    const showAll = showIgnoredMonitors || !hasIgnoredMonitors

    const visibleMonitors = showAll
      ? monitors
      : monitors.filter(
          monitor =>
            !monitor.isIgnored && (!monitor.inArtfully || monitor.hasChanged)
        )

    const hasVisibleMonitors = !!visibleMonitors && visibleMonitors.length > 0
    const venueHomepageUrl = venue.getHomepageUrl()

    return (
      <div styleName='container'>
        <EntitySectionHeading>
          {title}
        </EntitySectionHeading>
        <div styleName='monitors-container'>
          {getInProgress && <Loader size='large' />}
          {!getInProgress &&
            !hasVisibleMonitors &&
            <p styleName='no-monitors'>No Monitors Found</p>}
          {!getInProgress &&
            hasVisibleMonitors &&
            <Grid>
              {visibleMonitors.map(monitor =>
                React.createElement(gridRowComponent, {
                  key: monitor.key,
                  monitor,
                  venueHomepageUrl,
                  onEdit: this.handleEdit
                })
              )}
            </Grid>}
        </div>
        {hasIgnoredMonitors &&
          <div styleName='buttons-container'>
            <Button onClick={this.handleShowIgnoredMonitorsClick}>
              {`${showIgnoredMonitors ? 'Hide' : 'Show'} ignored monitors`}
            </Button>
          </div>}
        <Modal
          show={show}
          transition={FadeTransition}
          onHide={this.handleHide}
          aria-label='Edit Monitor'
        >
          <ModalContainer
            title='Edit Monitor'
            type='wide'
            onHide={this.handleHide}
          >
            <UpdateMonitorForm
              initialValues={editingMonitor}
              onSubmit={this.handleSubmit}
            />
          </ModalContainer>
        </Modal>
      </div>
    )
  }
}

MonitorCollection.propTypes = {
  title: PropTypes.string.isRequired,
  venue: PropTypes.instanceOf(FullVenue),
  monitors: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({ key: PropTypes.string.isRequired })),
    PropTypes.shape({ key: PropTypes.string.isRequired })
  ]),
  getInProgress: PropTypes.bool.isRequired,
  showIgnoredMonitors: PropTypes.bool.isRequired,
  gridRowComponent: PropTypes.func.isRequired,
  onMounted: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  setShowIgnoredMonitors: PropTypes.func.isRequired
}

export default withState(
  'showIgnoredMonitors',
  'setShowIgnoredMonitors',
  false
)(MonitorCollection)
