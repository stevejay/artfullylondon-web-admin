import React from 'react'
import PropTypes from 'prop-types'
import PencilIcon from 'react-icons/lib/fa/pencil'

import IconButton from '_src/components/button/icon'
import './event-monitor-grid-row.scss'

class EventMonitorGridRow extends React.Component {
  handleEdit = () => {
    const { monitor, onEdit } = this.props
    onEdit(monitor)
  }
  render () {
    const {
      monitor: {
        externalEventId,
        title,
        currentUrl,
        isIgnored,
        inArtfully,
        hasChanged,
        combinedEvents
      },
      venueHomepageUrl
    } = this.props

    const url = currentUrl || venueHomepageUrl

    return (
      <div styleName='container'>
        <div styleName='content'>
          <h2 styleName='title'>
            {!!url &&
              <a href={url} target='_blank' rel='noopener'>
                {title || externalEventId}
              </a>}
            {!url && <span>{title || externalEventId}</span>}
          </h2>
          <div>
            {isIgnored && <span styleName='tag'>ignored</span>}
            {!combinedEvents &&
              !isIgnored &&
              !inArtfully &&
              <span styleName='tag-missing'>not in artfully</span>}
            {hasChanged && <span styleName='tag-changed'>changed</span>}
          </div>
        </div>
        <IconButton
          icon={PencilIcon}
          onClick={this.handleEdit}
          aria-label='Edit'
        />
      </div>
    )
  }
}

EventMonitorGridRow.propTypes = {
  monitor: PropTypes.shape({
    externalEventId: PropTypes.string.isRequired,
    hasChanged: PropTypes.bool.isRequired,
    inArtfully: PropTypes.bool.isRequired,
    isIgnored: PropTypes.bool.isRequired,
    currentUrl: PropTypes.string,
    combinedEvents: PropTypes.bool,
    title: PropTypes.string
  }).isRequired,
  venueHomepageUrl: PropTypes.string,
  onEdit: PropTypes.func.isRequired
}

export default EventMonitorGridRow
