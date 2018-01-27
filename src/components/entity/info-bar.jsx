import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import GlobeIcon from 'react-icons/lib/fa/globe'
import PencilIcon from 'react-icons/lib/fa/pencil'
import CopyIcon from 'react-icons/lib/fa/copy'
import TagsIcon from 'react-icons/lib/fa/tags'

import * as linkConstants from '_src/constants/link'
import * as entityConstants from '_src/constants/entity'
import { FullTalent } from '_src/entities/talent'
import { FullVenue } from '_src/entities/venue'
import { FullEvent } from '_src/entities/event'
import { FullEventSeries } from '_src/entities/event-series'
import './info-bar.scss'

class InfoBar extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    const { entity, onClickCopy } = this.props
    const tagsLabel = entity.createInfoBarLabel()
    const homepage = entity.getLinkByType(linkConstants.LINK_TYPE_HOMEPAGE)

    return (
      <ul styleName='container'>
        {
          <li styleName='item'>
            <TagsIcon styleName='icon' />
            <span>{tagsLabel}</span>
          </li>
        }
        {!!homepage &&
          <li styleName='item'>
            <GlobeIcon styleName='icon' />
            <a
              styleName='link'
              href={homepage.url}
              target='_blank'
              rel='noopener'
            >
              Website
            </a>
          </li>}
        <li styleName='item'>
          <PencilIcon styleName='icon' />
          <Link styleName='link' to={entity.editUrl}>
            Edit
          </Link>
        </li>
        {entity.entityType === entityConstants.ENTITY_TYPE_EVENT &&
          <li styleName='item'>
            <CopyIcon styleName='icon' />
            <Link styleName='link' to='/event' onClick={onClickCopy}>
              Copy
            </Link>
          </li>}
      </ul>
    )
  }
}

InfoBar.propTypes = {
  entity: PropTypes.oneOfType([
    PropTypes.instanceOf(FullTalent),
    PropTypes.instanceOf(FullVenue),
    PropTypes.instanceOf(FullEvent),
    PropTypes.instanceOf(FullEventSeries)
  ]).isRequired,
  onClickCopy: PropTypes.func
}

export default InfoBar
