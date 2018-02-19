import React from 'react'
import PropTypes from 'prop-types'

import * as entitiesPropTypes from '_src/entities/prop-types'
import EntityTypeLabel from './entity-type-label'
import Image from './image'
import './shell.scss'

class EntityCardShell extends React.Component {
  shouldComponentUpdate (nextProps) {
    return nextProps.entity !== this.props.entity
  }
  handleClick = event => {
    // stop clicks on card closing the card.
    event.stopPropagation()
  }
  render () {
    const { entity, children, onImageLoad } = this.props

    return (
      <article key={entity.id} styleName='container' onClick={this.handleClick}>
        <EntityTypeLabel entity={entity} />
        <Image entity={entity} onImageLoad={onImageLoad} />
        <div styleName='detail'>
          {children}
        </div>
      </article>
    )
  }
}

EntityCardShell.propTypes = {
  entity: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  children: PropTypes.any.isRequired,
  onImageLoad: PropTypes.func
}

export default EntityCardShell
