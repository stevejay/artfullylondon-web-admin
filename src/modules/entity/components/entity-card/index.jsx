import React from 'react'
import PropTypes from 'prop-types'
import ArrowCircleRight from 'react-icons/lib/fa/arrow-circle-right'
import { Link } from 'react-router-dom'

import EntityCardShell from './shell'
import * as entitiesPropTypes from '_src/entities/prop-types'
import './index.scss'

class EntityCard extends React.PureComponent {
  render () {
    const { entity, cardContentFactory, dateStr, onClick } = this.props

    const content = React.createElement(cardContentFactory(entity.entityType), {
      entity,
      dateStr
    })

    return (
      <EntityCardShell entity={entity}>
        {content}
        <div styleName='actions-row'>
          <Link
            styleName='goto-entity'
            data-url={entity.url}
            to={entity.url}
            onClick={onClick}
          >
            <ArrowCircleRight styleName='goto-entity-icon' />
          </Link>
        </div>
      </EntityCardShell>
    )
  }
}

EntityCard.propTypes = {
  entity: entitiesPropTypes.SUMMARY_ENTITY.isRequired,
  dateStr: PropTypes.string.isRequired,
  cardContentFactory: PropTypes.func.isRequired,
  onClick: PropTypes.func
}

export default EntityCard
