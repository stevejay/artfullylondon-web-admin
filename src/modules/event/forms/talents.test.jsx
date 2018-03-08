import React from 'react'
import _ from 'lodash'
import { change } from 'redux-form'

import { EditEventTalentsForm } from './talents'
import * as eventConstants from '../constants'
import entityType from '_src/domain/types/entity-type'
import talentType from '_src/domain/types/talent-type'
import * as arrayLib from '_src/shared/lib/array'
import EntitySelectorSearch from '../components/entity-selector-search'
import Modal from '_src/shared/components/modal'
import Button from '_src/shared/components/button'
import { actions as searchActions } from '_src/modules/search'
import {
  CreateBasicTalentForm,
  actions as talentActions
} from '_src/modules/talent'

it('should render correctly when creating', () => {
  const wrapper = shallow(
    <EditEventTalentsForm
      initialValues={{ name: 'The Name' }}
      isEdit={false}
      submitting={false}
      handleSubmit={func => func}
      onSubmit={_.noop}
      onCancel={_.noop}
      onPreviousPage={_.noop}
      dispatch={_.noop}
      showingModal={false}
      setShowingModal={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when editing', () => {
  const wrapper = shallow(
    <EditEventTalentsForm
      initialValues={{ name: 'The Name' }}
      isEdit
      submitting={false}
      handleSubmit={func => func}
      onSubmit={_.noop}
      onCancel={_.noop}
      onPreviousPage={_.noop}
      dispatch={_.noop}
      showingModal={false}
      setShowingModal={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should handle an autocomplete select event', () => {
  arrayLib.addElement = jest.fn().mockReturnValue({ the: 'new value' })
  const dispatch = jest.fn()

  const wrapper = shallow(
    <EditEventTalentsForm
      initialValues={{ name: 'The Name' }}
      isEdit
      submitting={false}
      handleSubmit={func => func}
      onSubmit={_.noop}
      onCancel={_.noop}
      onPreviousPage={_.noop}
      dispatch={dispatch}
      showingModal={false}
      setShowingModal={_.noop}
    />
  )

  wrapper.instance()._talent = { value: 'bar' }

  return wrapper
    .find(EntitySelectorSearch)
    .prop('onAutocompleteSelect')(entityType.TALENT, 'some-talent-id', {
      output: 'The Name',
      status: 'Active',
      talentType: talentType.GROUP,
      commonRole: 'Common Role'
    })
    .then(() => {
      expect(arrayLib.addElement).toHaveBeenCalledWith('bar', {
        key: 'some-talent-id',
        id: 'some-talent-id',
        name: 'The Name',
        status: 'Active',
        talentType: talentType.GROUP,
        commonRole: 'Common Role',
        roles: 'Common Role',
        characters: ''
      })

      expect(dispatch).toHaveBeenCalledWith(
        change(eventConstants.EDIT_EVENT_TALENTS_FORM_NAME, 'talents', {
          the: 'new value'
        })
      )
    })
})

it('should handle an autocomplete select event when the talent already exists', () => {
  arrayLib.addElement = jest.fn().mockReturnValue(null)
  const dispatch = jest.fn()

  const wrapper = shallow(
    <EditEventTalentsForm
      initialValues={{ name: 'The Name' }}
      isEdit
      submitting={false}
      handleSubmit={func => func}
      onSubmit={_.noop}
      onCancel={_.noop}
      onPreviousPage={_.noop}
      dispatch={dispatch}
      showingModal={false}
      setShowingModal={_.noop}
    />
  )

  wrapper.instance()._talent = { value: 'bar' }

  return wrapper
    .find(EntitySelectorSearch)
    .prop('onAutocompleteSelect')(entityType.TALENT, 'some-talent-id', {
      output: 'The Name',
      status: 'Active',
      talentType: talentType.GROUP,
      commonRole: 'Common Role'
    })
    .then(
      () => {
        throw new Error('test failed')
      },
      () => {
        expect(dispatch).not.toHaveBeenCalled()
      }
    )
})

it('should handle an autocomplete search event', () => {
  const dispatch = jest.fn().mockReturnValue(Promise.resolve())

  const wrapper = shallow(
    <EditEventTalentsForm
      initialValues={{ name: 'The Name' }}
      isEdit
      submitting={false}
      handleSubmit={func => func}
      onSubmit={_.noop}
      onCancel={_.noop}
      onPreviousPage={_.noop}
      dispatch={dispatch}
      showingModal={false}
      setShowingModal={_.noop}
    />
  )

  return wrapper
    .find(EntitySelectorSearch)
    .prop('onAutocompleteSearch')('some term', entityType.TALENT)
    .then(() => {
      expect(dispatch).toHaveBeenCalledWith(
        searchActions.autocompleteSearch('some term', entityType.TALENT)
      )
    })
})

it('should handle showing the create talent modal', () => {
  const setShowingModal = jest.fn()

  const wrapper = shallow(
    <EditEventTalentsForm
      initialValues={{ name: 'The Name' }}
      isEdit
      submitting={false}
      handleSubmit={func => func}
      onSubmit={_.noop}
      onCancel={_.noop}
      onPreviousPage={_.noop}
      dispatch={_.noop}
      showingModal={false}
      setShowingModal={setShowingModal}
    />
  )

  wrapper.find(Button).simulate('click')

  expect(setShowingModal).toHaveBeenCalledWith(true)
})

it('should handle hiding the create talent modal', () => {
  const setShowingModal = jest.fn()

  const wrapper = shallow(
    <EditEventTalentsForm
      initialValues={{ name: 'The Name' }}
      isEdit
      submitting={false}
      handleSubmit={func => func}
      onSubmit={_.noop}
      onCancel={_.noop}
      onPreviousPage={_.noop}
      dispatch={_.noop}
      showingModal
      setShowingModal={setShowingModal}
    />
  )

  wrapper.find(Modal).simulate('hide')

  expect(setShowingModal).toHaveBeenCalledWith(false)
})

it('should handle a create talent event', () => {
  const setShowingModal = jest.fn()
  const dispatch = jest.fn().mockReturnValue(Promise.resolve())

  const wrapper = shallow(
    <EditEventTalentsForm
      initialValues={{ name: 'The Name' }}
      isEdit
      submitting={false}
      handleSubmit={func => func}
      onSubmit={_.noop}
      onCancel={_.noop}
      onPreviousPage={_.noop}
      dispatch={dispatch}
      showingModal
      setShowingModal={setShowingModal}
    />
  )

  return wrapper
    .find(CreateBasicTalentForm)
    .prop('onSubmit')({ the: 'values' })
    .then(() => {
      expect(dispatch).toHaveBeenCalledWith(
        talentActions.createTalentForEntity(
          { the: 'values' },
          eventConstants.EDIT_EVENT_TALENTS_FORM_NAME
        )
      )

      expect(setShowingModal).toHaveBeenCalledWith(false)
    })
})
