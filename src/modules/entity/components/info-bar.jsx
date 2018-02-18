import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import GlobeIcon from 'react-icons/lib/fa/globe'
import PencilIcon from 'react-icons/lib/fa/pencil'
import CopyIcon from 'react-icons/lib/fa/copy'
import TagsIcon from 'react-icons/lib/fa/tags'

import ShouldNeverUpdateComponent
  from '_src/components/base-class/should-never-update'
import linkType from '_src/entities/types/link-type'
import * as entitiesPropTypes from '_src/entities/prop-types'
import entityType from '_src/entities/types/entity-type'
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
          <Link styleName='link' to={entity.editUrl}>
            Edit
          </Link>
        </li>
        {entity.entityType === entityType.EVENT &&
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

EntityInfoBar.propTypes = {
  entity: entitiesPropTypes.EDITABLE_ENTITY.isRequired,
  onClickCopy: PropTypes.func
}

export default EntityInfoBar
