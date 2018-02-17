import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { ImagePlaceholder } from '_src/modules/image'
import * as imageLib from '_src/lib/image'
import { SummaryTalent } from '_src/entities/talent'
import entityType from '_src/entities/entity-type'
import './talent.scss'

class EventTalentComponent extends React.PureComponent {
  render () {
    const { talent, className, ...rest } = this.props

    return (
      <div {...rest} className={className} styleName='container'>
        {talent.hasImage &&
          <img
            styleName='img'
            src={imageLib.createImageUrl(imatalent.imagegeId, '120x120')}
          />}
        {!talent.hasImage &&
          <ImagePlaceholder
            styleName='placeholder'
            size='very-small'
            type={entityType.TALENT}
          />}
        <div styleName='details'>
          <p styleName='roles'>{talent.createRolesString()}</p>
          {talent.hasCharacters() &&
            <p styleName='characters'>
              {talent.createCharactersString()}
            </p>}
          <h4>
            <Link to={talent.url}>{talent.name}</Link>
          </h4>
        </div>
      </div>
    )
  }
}

EventTalentComponent.propTypes = {
  className: PropTypes.string,
  talent: PropTypes.instanceOf(SummaryTalent).isRequired
}

export default EventTalentComponent
