import React from 'react'
import _ from 'lodash'
import { submit as submitReduxForm } from 'redux-form'

import { EventEditOrCreate } from './event-edit-or-create'
import entityType from '_src/domain/types/entity-type'
import StepCollection from '_src/shared/components/step/collection'
import { FullEvent } from '_src/domain/event'
import * as eventNormaliseLib from '../lib/normalise'
import * as validationLib from '_src/shared/lib/validation'
import * as eventMapper from '../lib/mapper'
import * as eventConstants from '../constants'
import BasicsForm from '../forms/basics'
import TagsForm from '../forms/tags'
import ImagesForm from '../forms/images'
import TimesForm from '../forms/times'
import TalentsForm from '../forms/talents'
import * as eventNormalisers from '../constants/normalisers'
import { ALL_CONSTRAINT } from '../constants/constraints'
import { actions as entityActions } from '_src/modules/entity'

function createSubject (alterProps = {}) {
  const props = {
    entity: new FullEvent({ id: 'some-id' }),
    isEdit: false,
    onCancel: _.noop,
    stepIndex: 0,
    initialValues: { name: 'Initial Values' },
    setStepIndex: _.noop,
    updateInitialValues: _.noop,
    resetInitialValues: _.noop,
    dispatch: _.noop
  }

  return <EventEditOrCreate {...props} {...alterProps} />
}

it('should render correctly when creating and showing step 0', () => {
  const wrapper = shallow(createSubject({ stepIndex: 0 }))
  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when updating and showing step 0', () => {
  const wrapper = shallow(createSubject({ isEdit: true, stepIndex: 0 }))
  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when creating and showing step 1', () => {
  const wrapper = shallow(createSubject({ stepIndex: 1 }))
  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when creating and showing step 2', () => {
  const wrapper = shallow(createSubject({ stepIndex: 2 }))
  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when creating and showing step 3', () => {
  const wrapper = shallow(createSubject({ stepIndex: 3 }))
  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when creating and showing step 4', () => {
  const wrapper = shallow(createSubject({ stepIndex: 4 }))
  expect(wrapper).toMatchSnapshot()
})

describe('componentWillReceiveProps', () => {
  it('should not trigger actions when entity id is not changing', () => {
    const resetInitialValues = jest.fn()
    const setStepIndex = jest.fn()

    const wrapper = shallow(
      createSubject({
        stepIndex: 1,
        setStepIndex,
        resetInitialValues
      })
    )

    wrapper
      .instance()
      .componentWillReceiveProps({ entity: new FullEvent({ id: 'some-id' }) })

    expect(resetInitialValues).not.toHaveBeenCalled()
    expect(setStepIndex).not.toHaveBeenCalled()
  })

  it('should trigger actions when entity id is changing', () => {
    eventMapper.getInitialValues = jest
      .fn()
      .mockReturnValue({ initial: 'values ' })

    const resetInitialValues = jest.fn()
    const setStepIndex = jest.fn()

    const wrapper = shallow(
      createSubject({
        stepIndex: 1,
        setStepIndex,
        resetInitialValues
      })
    )

    wrapper.instance().componentWillReceiveProps({
      entity: new FullEvent({ id: 'different-id' })
    })

    expect(eventMapper.getInitialValues).toHaveBeenCalled()
    expect(resetInitialValues).toHaveBeenCalled()
    expect(setStepIndex).toHaveBeenCalled()
  })
})

it('should go to the previous page if on the second page', () => {
  const preventDefault = jest.fn()
  const setStepIndex = jest.fn()
  const wrapper = shallow(createSubject({ stepIndex: 1, setStepIndex }))

  wrapper.find(TagsForm).prop('onPreviousPage')({ preventDefault })

  expect(preventDefault).toHaveBeenCalled()
  expect(setStepIndex).toHaveBeenCalledWith(0)
})

it('should handle a next page step click', () => {
  const dispatch = jest.fn()
  const wrapper = shallow(createSubject({ stepIndex: 0, dispatch }))

  wrapper.find(StepCollection).prop('onStepClick')(1)

  expect(dispatch).toHaveBeenCalledWith(
    submitReduxForm(eventConstants.EDIT_EVENT_BASICS_FORM_NAME)
  )
})

it('should handle a previous page step click', () => {
  const setStepIndex = jest.fn()
  const wrapper = shallow(createSubject({ stepIndex: 1, setStepIndex }))

  wrapper.find(StepCollection).prop('onStepClick')(0)

  expect(setStepIndex).toHaveBeenCalledWith(0)
})

it('should handle submitting the first form', () => {
  let extraConstraintParam = null

  validationLib.validate = jest.fn((_, __, extraConstraint) => {
    extraConstraintParam = extraConstraint
    return Promise.resolve({ name: 'validated Foo' })
  })

  eventNormaliseLib.normaliseEventValues = jest.fn()
  const updateInitialValues = jest.fn()
  const setStepIndex = jest.fn()

  const wrapper = shallow(
    createSubject({ stepIndex: 0, updateInitialValues, setStepIndex })
  )

  return wrapper
    .find(BasicsForm)
    .prop('onSubmit')({ name: 'Foo', venue: { id: 'some-venue-id' } })
    .then(() => {
      expect(validationLib.validate).toHaveBeenCalled()
      expect(eventNormaliseLib.normaliseEventValues).toHaveBeenCalled()
      expect(updateInitialValues).toHaveBeenCalledWith({
        name: 'validated Foo'
      })
      expect(setStepIndex).toHaveBeenCalledWith(1)

      let errors = {}
      extraConstraintParam({ venue: { id: 'some-venue-id' } }, errors)
      expect(!!errors.venue).toEqual(false)

      errors = {}
      extraConstraintParam({ venue: {} }, errors)
      expect(errors.venue).toEqual('No venue selected')
    })
})

it('should handle submitting the second form', () => {
  let extraConstraintParam = null

  validationLib.validate = jest.fn((_, __, extraConstraint) => {
    extraConstraintParam = extraConstraint
    return Promise.resolve({ name: 'validated Foo' })
  })

  eventNormaliseLib.normaliseEventValues = jest.fn()
  const updateInitialValues = jest.fn()
  const setStepIndex = jest.fn()

  const wrapper = shallow(
    createSubject({ stepIndex: 1, updateInitialValues, setStepIndex })
  )

  return wrapper
    .find(TagsForm)
    .prop('onSubmit')({ name: 'Foo', venue: { id: 'some-venue-id' } })
    .then(() => {
      expect(validationLib.validate).toHaveBeenCalled()
      expect(eventNormaliseLib.normaliseEventValues).toHaveBeenCalled()
      expect(updateInitialValues).toHaveBeenCalledWith({
        name: 'validated Foo'
      })
      expect(setStepIndex).toHaveBeenCalledWith(2)

      let errors = {}
      extraConstraintParam(
        { mediumTags: [{ id: 'medium/sculpture ' }] },
        errors
      )
      expect(!!errors.mediumTags).toEqual(false)

      errors = {}
      extraConstraintParam({ mediumTags: [] }, errors)
      expect(errors.mediumTags).toEqual("Medium Tags can't be empty")
    })
})

it('should handle submitting the third form', () => {
  validationLib.validate = jest
    .fn()
    .mockReturnValue(Promise.resolve({ name: 'validated Foo' }))

  eventNormaliseLib.normaliseEventValues = jest.fn()
  const updateInitialValues = jest.fn()
  const setStepIndex = jest.fn()

  const wrapper = shallow(
    createSubject({ stepIndex: 2, updateInitialValues, setStepIndex })
  )

  return wrapper
    .find(TimesForm)
    .prop('onSubmit')({ name: 'Foo', venue: { id: 'some-venue-id' } })
    .then(() => {
      expect(validationLib.validate).toHaveBeenCalled()
      expect(eventNormaliseLib.normaliseEventValues).toHaveBeenCalled()
      expect(updateInitialValues).toHaveBeenCalledWith({
        name: 'validated Foo'
      })
      expect(setStepIndex).toHaveBeenCalledWith(3)
    })
})

it('should handle submitting the fourth form', () => {
  let extraConstraintParam = null

  validationLib.validate = jest.fn((_, __, extraConstraint) => {
    // extraConstraint({ talents: [{ roles: 'Some role' }] }, {})
    extraConstraintParam = extraConstraint
    return Promise.resolve({ name: 'validated Foo' })
  })

  eventNormaliseLib.normaliseEventValues = jest.fn()
  const updateInitialValues = jest.fn()
  const setStepIndex = jest.fn()

  const wrapper = shallow(
    createSubject({ stepIndex: 3, updateInitialValues, setStepIndex })
  )

  return wrapper
    .find(TalentsForm)
    .prop('onSubmit')({ name: 'Foo', venue: { id: 'some-venue-id' } })
    .then(() => {
      expect(validationLib.validate).toHaveBeenCalled()
      expect(eventNormaliseLib.normaliseEventValues).toHaveBeenCalled()
      expect(updateInitialValues).toHaveBeenCalledWith({
        name: 'validated Foo'
      })
      expect(setStepIndex).toHaveBeenCalledWith(4)

      let errors = {}
      extraConstraintParam({ talents: [{ roles: 'Some role' }] }, errors)
      expect(!!errors.talents).toEqual(false)

      errors = {}
      extraConstraintParam({ talents: [{ roles: '' }] }, errors)
      expect(errors.talents).toEqual('All talent must have roles assigned')
    })
})

it('should handle submitting the fifth form', () => {
  const dispatch = jest.fn()
  const wrapper = shallow(createSubject({ stepIndex: 4, dispatch }))

  wrapper.find(ImagesForm).simulate('submit', { name: 'Foo' })

  expect(dispatch).toHaveBeenCalledWith(
    entityActions.saveEntity(
      entityType.EVENT,
      { name: 'Foo' },
      false,
      eventConstants.EDIT_EVENT_IMAGES_FORM_NAME,
      eventNormalisers.ALL_NORMALISER,
      ALL_CONSTRAINT,
      eventMapper.mapSubmittedValues
    )
  )
})
