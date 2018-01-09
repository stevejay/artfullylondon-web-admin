import React from 'react'
import PropTypes from 'prop-types'
import { LINK_TYPE_WIKIPEDIA } from '_src/constants/link'
import { FullTalent } from '_src/entities/talent'
import { FullVenue } from '_src/entities/venue'
import { FullEvent } from '_src/entities/event'
import { FullEventSeries } from '_src/entities/event-series'
import './description.m.scss'

class EntityDescription extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    const { entity } = this.props
    const wikipediaLink = entity.getLinkByType(LINK_TYPE_WIKIPEDIA)
    const resultHtml = entity.createFormattedDescription()

    return (
      <div styleName='container'>
        <div
          styleName='html'
          dangerouslySetInnerHTML={{ __html: resultHtml }}
        />
        {!!wikipediaLink &&
          <a
            styleName='link'
            href={wikipediaLink.url}
            target='_blank'
            rel='noopener'
          >
            Read more on Wikipedia
          </a>}
      </div>
    )
  }
}

EntityDescription.propTypes = {
  entity: PropTypes.oneOfType([
    PropTypes.instanceOf(FullTalent),
    PropTypes.instanceOf(FullVenue),
    PropTypes.instanceOf(FullEvent),
    PropTypes.instanceOf(FullEventSeries)
  ]).isRequired
}

export default EntityDescription
