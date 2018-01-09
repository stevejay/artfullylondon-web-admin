import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import ArrowCircleLeft from 'react-icons/lib/fa/arrow-circle-left'
import ArrowCircleRight from 'react-icons/lib/fa/arrow-circle-right'
import Pusher from '_src/components/pusher'
import IconButton from '_src/components/button/icon'
import { SummaryTalent } from '_src/entities/talent'
import EventTalentComponent from './talent'
import './talent-carousel.m.scss'

class EventTalentCarousel extends React.Component {
  shouldComponentUpdate (nextProps) {
    return (
      nextProps.talents !== this.props.talents ||
      nextProps.selectedTalentId !== this.props.selectedTalentId
    )
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
  handleClickLeft = () => {
    const { talents, onTalentSelected } = this.props
    const talentIndex = this._getSelectedTalentIndex()
    let newTalentIndex = talentIndex - 1

    if (newTalentIndex < 0) {
      newTalentIndex = talents.length - 1
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
      return <EventTalentComponent talent={talents[0]} />
    }

    const talentIndex = this._getSelectedTalentIndex()

    return (
      <div styleName='container'>
        <EventTalentComponent talent={talents[talentIndex]} />
        <Pusher />
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
  talents: PropTypes.arrayOf(PropTypes.instanceOf(SummaryTalent).isRequired),
  selectedTalentId: PropTypes.string,
  onTalentSelected: PropTypes.func.isRequired
}

export default EventTalentCarousel
