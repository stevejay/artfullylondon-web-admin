import React from 'react'
import PropTypes from 'prop-types'
import PencilIcon from 'react-icons/lib/fa/pencil'

import './venue-monitor-grid-row.scss'

const ROW_LABEL = 'Venue Openings'

const VenueMonitorGridRow = ({
  monitor: { isIgnored, hasChanged },
  venueHomepageUrl,
  onEdit
}) => (
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
    <PencilIcon tabIndex='0' styleName='icon' onClick={onEdit} />
  </div>
)

VenueMonitorGridRow.propTypes = {
  monitor: PropTypes.shape({
    hasChanged: PropTypes.bool.isRequired,
    isIgnored: PropTypes.bool.isRequired
  }).isRequired,
  venueHomepageUrl: PropTypes.string,
  onEdit: PropTypes.func.isRequired
}

export default VenueMonitorGridRow
