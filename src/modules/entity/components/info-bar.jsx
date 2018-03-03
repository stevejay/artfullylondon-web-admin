import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import GlobeIcon from 'react-icons/lib/fa/globe'
import PencilIcon from 'react-icons/lib/fa/pencil'
import CopyIcon from 'react-icons/lib/fa/copy'
import TagsIcon from 'react-icons/lib/fa/tags'

import ShouldNeverUpdateComponent
  from '_src/shared/components/base-class/should-never-update'
import linkType from '_src/domain/types/link-type'
import * as entityConstants from '../constants'
import entityType from '_src/domain/types/entity-type'
import './info-bar.scss'

class EntityInfoBar extends ShouldNeverUpdateComponent {
  render () {
    const { entity, onClickCopy } = this.props
    const tagsLabel = entity.getInfoBarLabel()
    const homepage = entity.getLinkByType(linkType.HOMEPAGE)

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
          <Link styleName='link' to={entity.getEditUrl()}>
            Edit
          </Link>
        </li>
        {entity.entityType === entityType.EVENT &&
          <li styleName='item'>
            <CopyIcon styleName='icon' />
            <Link
              styleName='link'
              to={{
                pathname: '/event',
                state: { copyEventId: entity.id }
              }}
            >
              Copy
            </Link>
          </li>}
      </ul>
    )
  }
}

EntityInfoBar.propTypes = {
  entity: entityConstants.EDITABLE_ENTITY_PROP_TYPE.isRequired,
  onClickCopy: PropTypes.func
}

export default EntityInfoBar
