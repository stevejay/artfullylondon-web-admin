import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { submit as submitReduxForm } from 'redux-form'
import { withStateHandlers } from 'recompose'
import _ from 'lodash'

import { Image } from '_src/modules/image'
import Divider from '_src/shared/components/divider'
import StepCollection from '_src/shared/components/step/collection'
import { FullEvent } from '_src/domain/event'
import {
  EntityDetailsContainer,
  EntityHeading,
  actions as entityActions
} from '_src/modules/entity'
import entityType from '_src/domain/types/entity-type'
import * as eventConstants from '../constants'
import * as eventNormalisers from '../constants/normalisers'
import * as eventMapper from '../lib/mapper'
import * as eventNormaliseLib from '../lib/normalise'
import * as validationLib from '_src/shared/lib/validation'
import {
  BASIC_CONSTRAINT,
  TAGS_CONSTRAINT,
  TIMES_CONSTRAINT,
  TALENT_CONSTRAINT,
  ALL_CONSTRAINT
} from '../constants/constraints'
import BasicsForm from '../forms/basics'
import TagsForm from '../forms/tags'
import ImagesForm from '../forms/images'
import TimesForm from '../forms/times'
import TalentsForm from '../forms/talents'

export class EventEditOrCreate extends React.Component {
  componentWillReceiveProps (nextProps) {
    if (nextProps.entity.id !== this.props.entity.id) {
      const initialValues = eventMapper.getInitialValues(nextProps.entity)
      this.props.resetInitialValues(initialValues)
      this.props.setStepIndex(0)
    }
  }
  handlePreviousPage = event => {
    event.preventDefault()
    const { stepIndex, setStepIndex } = this.props
    setStepIndex(stepIndex - 1)
  }
  handleStepClick = nextStepIndex => {
    const { stepIndex } = this.props

    if (nextStepIndex > stepIndex) {
      const step = _.find(
        eventConstants.EDIT_FORM_STEPS,
        element => element.page === stepIndex
      )

      step && this.props.dispatch(submitReduxForm(step.formName))
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
    const { isEdit, dispatch } = this.props

    dispatch(
      entityActions.saveEntity(
        entityType.EVENT,
        values,
        isEdit,
        eventConstants.EDIT_EVENT_IMAGES_FORM_NAME,
        eventNormalisers.ALL_NORMALISER,
        ALL_CONSTRAINT,
        eventMapper.mapSubmittedValues
      )
    )
  }
  _handlePageSubmit = (values, constraint, extraConstraint) => {
    const { stepIndex, setStepIndex, updateInitialValues } = this.props

    return validationLib.validate(values, constraint, extraConstraint).then(
      values =>
        new Promise(resolve => {
          eventNormaliseLib.normaliseEventValues(values)
          updateInitialValues(values)
          stepIndex < 4 && setStepIndex(stepIndex + 1)
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
            steps={eventConstants.EDIT_FORM_STEPS}
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
  stepIndex: PropTypes.number.isRequired,
  initialValues: PropTypes.object.isRequired,
  setStepIndex: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  updateInitialValues: PropTypes.func.isRequired,
  resetInitialValues: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect()(
  withStateHandlers(
    /* istanbul ignore next */
    props => ({
      stepIndex: 0,
      initialValues: eventMapper.getInitialValues(props.entity)
    }),
    {
      setStepIndex: /* istanbul ignore next */ () => value => ({
        stepIndex: value
      }),
      updateInitialValues: /* istanbul ignore next */ ({
        initialValues
      }) => values => ({
        initialValues: { ...initialValues, ...values }
      }),
      resetInitialValues: /* istanbul ignore next */ () => values => ({
        initialValues: values
      })
    }
  )(EventEditOrCreate)
)
