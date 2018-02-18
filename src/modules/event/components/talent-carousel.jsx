import React from 'react'
import PropTypes from 'prop-types'
import ArrowCircleLeft from 'react-icons/lib/fa/arrow-circle-left'
import ArrowCircleRight from 'react-icons/lib/fa/arrow-circle-right'
import _ from 'lodash'

import EventTalent from './talent'
import IconButton from '_src/components/button/icon'
import { EventSummaryTalent } from '_src/entities/talent'
import './talent-carousel.scss'

class EventTalentCarousel extends React.PureComponent {
  handleClickLeft = () => {
    const { talents, onTalentSelected } = this.props
    const talentIndex = this._getSelectedTalentIndex()
    let newTalentIndex = talentIndex - 1

    if (newTalentIndex < 0) {
      newTalentIndex = talents.length - 1
    }

    onTalentSelected({ talentId: talents[newTalentIndex].id })
  }
  handleClickRight = () => {
    const { talents, onTalentSelected } = this.props
    const talentIndex = this._getSelectedTalentIndex()
    let newTalentIndex = talentIndex + 1

    if (newTalentIndex >= talents.length) {
      newTalentIndex = 0
    }

    onTalentSelected({ talentId: talents[newTalentIndex].id })
  }
  _getSelectedTalentIndex () {
    const index = this.props.talents.findIndex(
      value => value.id === this.props.selectedTalentId
    )

    return index === -1 ? 0 : index
  }
  render () {
    const { talents } = this.props
    const hasTalents = !_.isEmpty(talents)

    if (!hasTalents) {
      return null
    }

    if (talents.length === 1) {
      return <EventTalent talent={talents[0]} />
    }

    const talentIndex = this._getSelectedTalentIndex()

    return (
      <div styleName='container'>
        <EventTalent talent={talents[talentIndex]} styleName='event-talent' />
        <div styleName='buttons-container'>
          <IconButton
            type='default'
            icon={ArrowCircleRight}
            onClick={this.handleClickRight}
            aria-label='Next talent'
          />
          <IconButton
            type='default'
            icon={ArrowCircleLeft}
            onClick={this.handleClickLeft}
            aria-label='Previous talent'
          />
        </div>
      </div>
    )
  }
}

EventTalentCarousel.propTypes = {
  talents: PropTypes.arrayOf(
    PropTypes.instanceOf(EventSummaryTalent).isRequired
  ),
  selectedTalentId: PropTypes.string,
  onTalentSelected: PropTypes.func.isRequired
}

export default EventTalentCarousel
