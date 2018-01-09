import React from 'react'
import PropTypes from 'prop-types'

import Loader from '_src/components/loader'
import Button from '_src/components/button'
import { FullVenue } from '_src/entities/venue'
import Grid from '_src/components/grid'
import './collection.m.scss'

class MonitorCollection extends React.Component {
  constructor (props) {
    super(props)
    this.state = { showIgnoredMonitors: false }
  }
  componentDidMount () {
    const { onMounted } = this.props

    if (onMounted) {
      onMounted()
    }
  }
  shouldComponentUpdate (nextProps, nextState) {
    return (
      nextProps.getInProgress !== this.props.getInProgress ||
      nextProps.monitors !== this.props.monitors ||
      nextState.showIgnoredMonitors !== this.state.showIgnoredMonitors
    )
  }
  handleShowIgnoredMonitorsClick = () => {
    this.setState({
      showIgnoredMonitors: !this.state.showIgnoredMonitors
    })
  }
  render () {
    const {
      venue,
      monitors,
      getInProgress,
      onEdit,
      gridRowComponent
    } = this.props

    const { showIgnoredMonitors } = this.state
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
                  onEdit
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
      </div>
    )
  }
}

MonitorCollection.propTypes = {
  venue: PropTypes.instanceOf(FullVenue),
  monitors: PropTypes.arrayOf(
    PropTypes.shape({ key: PropTypes.string.isRequired })
  ).isRequired,
  getInProgress: PropTypes.bool.isRequired,
  onMounted: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  gridRowComponent: PropTypes.func.isRequired
}

export default MonitorCollection
