import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { ImagePlaceholder } from '_src/modules/image'
import * as imageLib from '_src/shared/lib/image'
import { EventSummaryTalent } from '_src/domain/talent'
import entityType from '_src/domain/types/entity-type'
import './talent.scss'

class EventTalentComponent extends React.PureComponent {
  render () {
    const { talent, className, ...rest } = this.props

    return (
      <div {...rest} className={className} styleName='container'>
        {talent.hasImage() &&
          <img
            styleName='img'
            src={imageLib.createImageUrl(talent.image, '120x120')}
          />}
        {!talent.hasImage() &&
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
            <Link to={talent.getUrl()}>{talent.name}</Link>
          </h4>
        </div>
      </div>
    )
  }
}

EventTalentComponent.propTypes = {
  className: PropTypes.string,
  talent: PropTypes.instanceOf(EventSummaryTalent).isRequired
}

export default EventTalentComponent
