import React from 'react'
import PropTypes from 'prop-types'
import PencilIcon from 'react-icons/lib/fa/pencil'

import IconButton from '_src/components/button/icon'
import './venue-monitor-grid-row.scss'

const ROW_LABEL = 'Venue Openings'

class VenueMonitorGridRow extends React.Component {
  handleEdit = () => {
    this.props.onEdit(this.props.monitor)
  }
  render () {
    const { monitor: { isIgnored, hasChanged }, venueHomepageUrl } = this.props

    // TODO use a button for the edit option:

    // TODO replace with button

    return (
      <div styleName='container'>
        <div styleName='content'>
          <h2 styleName='title'>
            {!!venueHomepageUrl &&
              <a href={venueHomepageUrl} target='_blank' rel='noopener'>
                {ROW_LABEL}
              </a>}
            {!venueHomepageUrl && <span>{ROW_LABEL}</span>}
          </h2>
          <div>
            {isIgnored && <span styleName='tag'>ignored</span>}
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

VenueMonitorGridRow.propTypes = {
  monitor: PropTypes.shape({
    hasChanged: PropTypes.bool,
    isIgnored: PropTypes.bool
  }).isRequired,
  venueHomepageUrl: PropTypes.string,
  onEdit: PropTypes.func.isRequired
}

export default VenueMonitorGridRow
