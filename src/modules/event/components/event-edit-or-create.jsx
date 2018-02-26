import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { submit as submitReduxForm } from 'redux-form'
import { withStateHandlers } from 'recompose'

import { Image } from '_src/modules/image'
import Divider from '_src/shared/components/divider'
import StepCollection from '_src/shared/components/step/collection'
import { FullEvent } from '_src/domain/event'
import { EntityDetailsContainer, EntityHeading } from '_src/modules/entity'
import entityType from '_src/domain/types/entity-type'
import * as eventConstants from '../constants'
import * as eventMapper from '../lib/mapper'
import * as eventNormaliseLib from '../lib/normalise'
import * as validationLib from '_src/shared/lib/validation'
import * as eventActions from '../actions'
import {
  BASIC_CONSTRAINT,
  TAGS_CONSTRAINT,
  TIMES_CONSTRAINT,
  TALENT_CONSTRAINT
} from '../constants/constraints'
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
  componentWillMount () {
    this.props.dispatch(eventActions.getAllTags())
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.entity.id !== this.props.entity.id) {
      this.props.resetInitialValues(
        eventMapper.getInitialValues(nextProps.entity)
      )

      this.props.setStepIndex(0)
    }
  }
  nextPage = () => {
    const { stepIndex, setStepIndex } = this.props
    stepIndex < 4 && setStepIndex(stepIndex + 1)
  }
  handlePreviousPage = event => {
    event.preventDefault()
    const { stepIndex, setStepIndex } = this.props
    stepIndex > 0 && setStepIndex(stepIndex - 1)
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
      this.props.setStepIndex(nextStepIndex)
    }
  }
  handleSubmitBasics = values => {
    return this._handlePageSubmit(
      values,
      BASIC_CONSTRAINT,
      (values, errors) => {
        if (!values.venue || !values.venue.id) {
          errors.venue = 'No venue selected'
        }
      }
    )
  }
  handleSubmitTags = values => {
    return this._handlePageSubmit(values, TAGS_CONSTRAINT, (values, errors) => {
      if (!values.mediumTags || values.mediumTags.length === 0) {
        errors.mediumTags = "Medium Tags can't be empty"
      }
    })
  }
  handleSubmitTimes = values => {
    return this._handlePageSubmit(values, TIMES_CONSTRAINT)
  }
  handleSubmitTalent = values => {
    return this._handlePageSubmit(
      values,
      TALENT_CONSTRAINT,
      (values, errors) => {
        if (values.talents.filter(x => x.roles === '').length) {
          errors.talents = 'All talent must have roles assigned'
        }
      }
    )
  }
  handleSubmit = values => {
    // TODO
  }
  _handlePageSubmit = (values, constraint, extraConstraint) => {
    return validationLib.validate(values, constraint, extraConstraint).then(
      values =>
        new Promise(resolve => {
          eventNormaliseLib.normaliseEventValues(values)
          this.props.updateInitialValues(values)
          this.nextPage()
          resolve()
        })
    )
  }
  render () {
    const { entity, isEdit, stepIndex, initialValues, onCancel } = this.props

    return (
      <React.Fragment>
        <Image entityType={entityType.EVENT} images={entity.images} />
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
              isEdit={isEdit}
              initialValues={initialValues}
            />}
          {stepIndex === 1 &&
            <TagsForm
              onSubmit={this.handleSubmitTags}
              onPreviousPage={this.handlePreviousPage}
              onCancel={onCancel}
              isEdit={isEdit}
              initialValues={initialValues}
            />}
          {stepIndex === 2 &&
            <TimesForm
              onSubmit={this.handleSubmitTimes}
              onPreviousPage={this.handlePreviousPage}
              onCancel={onCancel}
              isEdit={isEdit}
              initialValues={initialValues}
            />}
          {stepIndex === 3 &&
            <TalentsForm
              onSubmit={this.handleSubmitTalent}
              onPreviousPage={this.handlePreviousPage}
              onCancel={onCancel}
              isEdit={isEdit}
              initialValues={initialValues}
            />}
          {stepIndex === 4 &&
            <ImagesForm
              onSubmit={this.handleSubmit}
              onPreviousPage={this.handlePreviousPage}
              onCancel={onCancel}
              isEdit={isEdit}
              initialValues={initialValues}
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
  initialValues: PropTypes.object.isRequired,
  setStepIndex: PropTypes.func.isRequired,
  updateInitialValues: PropTypes.func.isRequired,
  resetInitialValues: PropTypes.func.isRequired
}

export default connect()(
  withStateHandlers(
    props => ({
      stepIndex: 0,
      initialValues: eventMapper.getInitialValues(props.entity)
    }),
    {
      setStepIndex: () => value => ({
        stepIndex: value
      }),
      updateInitialValues: ({ initialValues }) => values => ({
        initialValues: { ...initialValues, ...values }
      }),
      resetInitialValues: () => values => ({
        initialValues: values
      })
    }
  )(EventEditOrCreate)
)
