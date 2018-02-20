import React from 'react'
import PropTypes from 'prop-types'
import { withStateHandlers } from 'recompose'

import Modal from '_src/shared/components/modal'
import ModalContainer from '_src/shared/components/modal/container'
import FadeTransition from '_src/shared/components/transition/fade'
import UpdateMonitorForm from '../forms/update-monitor'
import Loader from '_src/shared/components/loader'
import Button from '_src/shared/components/button'
import Grid from '_src/shared/components/grid'
import { EntitySectionHeading } from '_src/modules/entity'
import './collection.scss'

export class MonitorCollection extends React.PureComponent {
  componentDidMount () {
    const { onMounted } = this.props
    onMounted && onMounted()
  }
  handleShowIgnoredClick = () => {
    this.props.toggleShowIgnored()
  }
  handleEdit = monitor => {
    this.props.setEditingMonitorTo(monitor)
  }
  handleHide = () => {
    this.props.setEditingMonitorTo(null)
  }
  handleSubmit = values => {
    this.props.onSubmit(values).then(() => this.handleHide())
  }
  render () {
    const {
      title,
      venueHomepageUrl,
      monitors,
      getInProgress,
      gridRowComponent,
      showIgnored,
      editingMonitor
    } = this.props

    const withoutIgnored = monitors.filter(
      monitor =>
        !monitor.isIgnored && (!monitor.inArtfully || monitor.hasChanged)
    )

    const visibleMonitors = showIgnored ? monitors : withoutIgnored
    const hasVisibleMonitors = !!visibleMonitors.length
    const hasIgnoredMonitors = withoutIgnored.length < monitors.length

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
        {!getInProgress &&
          hasIgnoredMonitors &&
          <div styleName='buttons-container'>
            <Button onClick={this.handleShowIgnoredClick}>
              {`${showIgnored ? 'Hide' : 'Show'} ignored monitors`}
            </Button>
          </div>}
        <Modal
          show={!!editingMonitor}
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
  venueHomepageUrl: PropTypes.string,
  monitors: PropTypes.arrayOf(
    PropTypes.shape({ key: PropTypes.string.isRequired })
  ),
  getInProgress: PropTypes.bool.isRequired,
  gridRowComponent: PropTypes.func.isRequired,
  showIgnored: PropTypes.bool.isRequired,
  editingMonitor: PropTypes.object,
  onMounted: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  toggleShowIgnored: PropTypes.func.isRequired,
  setEditingMonitorTo: PropTypes.func.isRequired
}

export default withStateHandlers(
  { showIgnored: false, editingMonitor: null },
  {
    toggleShowIgnored: ({ showIgnored }) => () => ({
      showIgnored: !showIgnored
    }),
    setEditingMonitorTo: () => value => ({ editingMonitor: value })
  }
)(MonitorCollection)
