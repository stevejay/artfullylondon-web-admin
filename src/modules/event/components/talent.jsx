import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { ImagePlaceholder } from '_src/modules/image'
import * as entityConstants from '_src/constants/entity'
import * as image from '_src/lib/image'
import { SummaryTalent } from '_src/entities/talent'
import './talent.scss'

class EventTalentComponent extends React.PureComponent {
  render () {
    const { talent, className, ...rest } = this.props

    return (
      <div {...rest} className={className} styleName='container'>
        {talent.hasImage &&
          <img
            styleName='img'
            src={image.createEventTalentImageUrl(talent.image)}
          />}
        {!talent.hasImage &&
          <ImagePlaceholder
            styleName='placeholder'
            size='very-small'
            type={entityConstants.ENTITY_TYPE_TALENT}
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
