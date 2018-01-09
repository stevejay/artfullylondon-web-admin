import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ENTITY_TYPE_TALENT } from '_src/constants/entity'
import ImagePlaceholder from '_src/components/image-placeholder'
import * as image from '_src/lib/image'
import { SummaryTalent } from '_src/entities/talent'
import './talent.m.scss'

class EventTalentComponent extends React.Component {
  shouldComponentUpdate (nextProps) {
    return nextProps.talent !== this.props.talent
  }
  render () {
    const { talent, ...rest } = this.props

    return (
      <div {...rest} styleName='container'>
        {talent.hasImage &&
          <img
            styleName='img'
            src={image.createEventTalentImageUrl(talent.image)}
          />}
        {!talent.hasImage &&
          <ImagePlaceholder
            styleName='placeholder'
            size='very-small'
            type={ENTITY_TYPE_TALENT}
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
  talent: PropTypes.instanceOf(SummaryTalent).isRequired
}

export default EventTalentComponent
