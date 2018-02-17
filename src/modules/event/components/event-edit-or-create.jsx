import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { submit as submitReduxForm } from 'redux-form'
import { withState } from 'recompose'

import { Image } from '_src/modules/image'
import Divider from '_src/components/divider'
import StepCollection from '_src/components/step/collection'
import { FullEvent } from '_src/entities/event'
import { EntityDetailsContainer, EntityHeading } from '_src/modules/entity'
import * as eventConstants from '../constants'
import * as eventConstraints from '../constants/constraints'
import entityType from '_src/entities/entity-type'
import BasicsForm from '../forms/basics'
import TagsForm from '../forms/tags'
import ImagesForm from '../forms/images'
import TimesForm from '../forms/times'
import TalentsForm from '../forms/talents'

const STEPS = [
  { page: 0, title: 'Basics' },
  { page: 1, title: 'Tags' },
  { page: 2, title: 'Times' },
  { page: 3, title: 'Talent' },
  { page: 4, title: 'Images' }
]

export class EventEditOrCreate extends React.Component {
  componentWillReceiveProps (nextProps) {
    if (nextProps.entity.id !== this.props.entity.id) {
      this.props.updateStepIndex(0)
    }
  }
  nextPage = () => {
    const { stepIndex, updateStepIndex } = this.props
    stepIndex < 4 && updateStepIndex(stepIndex + 1)
  }
  previousPage = event => {
    event.preventDefault()
    const { stepIndex, updateStepIndex } = this.props
    stepIndex > 0 && updateStepIndex(stepIndex - 1)
  }
  handleStepClick = nextStepIndex => {
    const { stepIndex } = this.props

    if (nextStepIndex > stepIndex) {
      switch (stepIndex) {
        case 0:
          return this.props.dispatch(
            submitReduxForm(eventConstants.EDIT_EVENT_BASICS_FORM_NAME)
          )
        case 1:
          return this.props.dispatch(
            submitReduxForm(eventConstants.EDIT_EVENT_TAGS_FORM_NAME)
          )
        case 2:
          return this.props.dispatch(
            submitReduxForm(eventConstants.EDIT_EVENT_TIMES_FORM_NAME)
          )
        case 3:
          return this.props.dispatch(
            submitReduxForm(eventConstants.EDIT_EVENT_TALENTS_FORM_NAME)
          )
      }
    } else {
      this.props.updateStepIndex(nextStepIndex)
    }
  }
  handleSubmitBasics = values => {}
  handleSubmitTags = values => {}
  handleSubmitTimes = values => {}
  handleSubmitTalent = values => {}
  handleSubmit = values => {}
  render () {
    const { entity, stepIndex, onCancel } = this.props

    return (
      <React.Fragment>
        <Image
          entityType={entityType.EVENT}
          images={entity.images}
        />
        <EntityHeading>
          {entity.name || 'New Event'}
        </EntityHeading>
        <EntityDetailsContainer>
          <StepCollection
            currentPage={stepIndex}
            onStepClick={this.handleStepClick}
            steps={STEPS}
          />
          <Divider />
          {stepIndex === 0 &&
            <BasicsForm
              onSubmit={this.handleSubmitBasics}
              onCancel={onCancel}
              constraint={eventConstraints.BASIC_CONSTRAINT}
            />}
          {stepIndex === 1 &&
            <TagsForm
              onSubmit={this.handleSubmitTags}
              previousPage={this.previousPage}
              onCancel={onCancel}
            />}
          {stepIndex === 2 &&
            <TimesForm
              onSubmit={this.handleSubmitTimes}
              previousPage={this.previousPage}
              onCancel={onCancel}
            />}
          {stepIndex === 3 &&
            <TalentsForm
              onSubmit={this.handleSubmitTalent}
              previousPage={this.previousPage}
              onCancel={onCancel}
            />}
          {stepIndex === 4 &&
            <ImagesForm
              onSubmit={this.handleSubmit}
              previousPage={this.previousPage}
              onCancel={onCancel}
            />}
        </EntityDetailsContainer>
      </React.Fragment>
    )
  }
}

EventEditOrCreate.propTypes = {
  entity: PropTypes.instanceOf(FullEvent).isRequired,
  isEdit: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  stepIndex: PropTypes.number.isRequired,
  updateStepIndex: PropTypes.func.isRequired
}

export default connect()(
  withState('stepIndex', 'updateStepIndex', 0)(EventEditOrCreate)
)
