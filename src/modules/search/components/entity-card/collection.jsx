import React from 'react'
import PropTypes from 'prop-types'

import EntityCard from './index'
import * as entitiesPropTypes from '_src/domain/prop-types'
import './collection.scss'

class EntityCardCollection extends React.PureComponent {
  componentDidMount () {
    this.props.onMounted && this.props.onMounted()
  }
  render () {
    const { entities, cardContentFactory, dateStr, className } = this.props

    return (
      <div styleName='cards-container' className={className}>
        {(entities || [])
          .map(entity => (
            <EntityCard
              key={entity.key}
              entity={entity}
              dateStr={dateStr}
              cardContentFactory={cardContentFactory}
            />
          ))}
      </div>
    )
  }
}

EntityCardCollection.propTypes = {
  entities: PropTypes.arrayOf(entitiesPropTypes.SUMMARY_ENTITY.isRequired),
  // TODO is getInProgress needed by this component?
  getInProgress: PropTypes.bool,
  dateStr: PropTypes.string.isRequired,
  className: PropTypes.string,
  cardContentFactory: PropTypes.func.isRequired,
  onMounted: PropTypes.func
}

export default EntityCardCollection
