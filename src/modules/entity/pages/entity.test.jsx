import React from 'react'
import _ from 'lodash'
import log from 'loglevel'

import { FullTalent } from '_src/domain/talent'
import { EntityPage } from './entity'
import * as entityActions from '../actions'
import { actions as tagActions } from '_src/modules/tag'

class SomeComponent extends React.Component {
  render () {
    return <div id='component' />
  }
}

it('should render correctly when an error was raised', () => {
  const wrapper = shallow(
    <EntityPage
      entityType={entityType.TALENT}
      viewing
      entityId='some-id'
      entity={null}
      getInProgress={false}
      getFailed
      gettingTags={false}
      component={SomeComponent}
      dispatch={_.noop}
      match={{}}
      location={{}}
      history={{}}
      hasError
      setHasError={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when an error was raised', () => {
  const setHasError = jest.fn()
  log.error = jest.fn()

  const wrapper = shallow(
    <EntityPage
      entityType={entityType.TALENT}
      viewing
      entityId='some-id'
      entity={null}
      getInProgress={false}
      getFailed
      gettingTags={false}
      component={SomeComponent}
      dispatch={_.noop}
      match={{}}
      location={{}}
      history={{}}
      hasError={false}
      setHasError={setHasError}
    />
  )

  wrapper.instance().componentDidCatch(new Error('deliberately thrown'), {})

  expect(setHasError).toHaveBeenCalledWith(true)
  expect(log.error).toHaveBeenCalled()
})

it('should render correctly when get entity failed', () => {
  const wrapper = shallow(
    <EntityPage
      entityType={entityType.TALENT}
      viewing
      entityId='some-id'
      entity={null}
      getInProgress={false}
      getFailed
      gettingTags={false}
      component={SomeComponent}
      dispatch={_.noop}
      match={{}}
      location={{}}
      history={{}}
      hasError={false}
      setHasError={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when get is in progress', () => {
  const wrapper = shallow(
    <EntityPage
      entityType={entityType.TALENT}
      viewing
      entityId='some-id'
      entity={null}
      getInProgress
      getFailed={false}
      gettingTags={false}
      component={SomeComponent}
      dispatch={_.noop}
      match={{}}
      location={{}}
      history={{}}
      hasError={false}
      setHasError={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when getting tags', () => {
  const wrapper = shallow(
    <EntityPage
      entityType={entityType.TALENT}
      viewing
      entityId='some-id'
      entity={null}
      getInProgress={false}
      getFailed={false}
      gettingTags
      component={SomeComponent}
      dispatch={_.noop}
      match={{}}
      location={{}}
      history={{}}
      hasError={false}
      setHasError={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when has an entity', () => {
  const wrapper = shallow(
    <EntityPage
      entityType={entityType.TALENT}
      viewing
      entityId='some-id'
      entity={new FullTalent({ id: 'some-id' })}
      getInProgress={false}
      getFailed={false}
      gettingTags={false}
      component={SomeComponent}
      dispatch={_.noop}
      match={{}}
      location={{}}
      history={{}}
      hasError={false}
      setHasError={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should trigger getting the entity on construction when viewing an entity', () => {
  const dispatch = jest.fn()

  shallow(
    <EntityPage
      entityType={entityType.TALENT}
      viewing
      entityId='some-id'
      entity={null}
      getInProgress={false}
      getFailed={false}
      gettingTags={false}
      component={SomeComponent}
      dispatch={dispatch}
      match={{}}
      location={{}}
      history={{}}
      hasError={false}
      setHasError={_.noop}
    />
  )

  expect(dispatch).toHaveBeenCalledWith(
    entityActions.getEntity(entityType.TALENT, 'some-id')
  )

  expect(dispatch).not.toHaveBeenCalledWith(tagActions.getTags())
})

it('should trigger getting the entity on construction when editing an entity', () => {
  const dispatch = jest.fn()

  shallow(
    <EntityPage
      entityType={entityType.TALENT}
      viewing={false}
      entityId='some-id'
      entity={null}
      getInProgress={false}
      getFailed={false}
      gettingTags={false}
      component={SomeComponent}
      dispatch={dispatch}
      match={{}}
      location={{}}
      history={{}}
      hasError={false}
      setHasError={_.noop}
    />
  )

  expect(dispatch).toHaveBeenCalledWith(
    entityActions.getEntity(entityType.TALENT, 'some-id')
  )

  expect(dispatch).toHaveBeenCalledWith(tagActions.getTags())
})

it('should trigger getting the entity on construction when creating an entity', () => {
  const dispatch = jest.fn()

  shallow(
    <EntityPage
      entityType={entityType.TALENT}
      viewing={false}
      entityId={null}
      entity={null}
      getInProgress={false}
      getFailed={false}
      gettingTags={false}
      component={SomeComponent}
      dispatch={dispatch}
      match={{}}
      location={{}}
      history={{}}
      hasError={false}
      setHasError={_.noop}
    />
  )

  expect(dispatch).toHaveBeenCalledWith(
    entityActions.resetEntityForCreate(entityType.TALENT)
  )

  expect(dispatch).toHaveBeenCalledWith(tagActions.getTags())
})

it('should not trigger getting the entity when props change but the same entity is specified', () => {
  const dispatch = jest.fn()
  const location = { path: '/first' }

  const wrapper = shallow(
    <EntityPage
      entityType={entityType.TALENT}
      viewing
      entityId='some-id'
      entity={null}
      getInProgress={false}
      getFailed={false}
      gettingTags={false}
      component={SomeComponent}
      dispatch={dispatch}
      match={{}}
      location={location}
      history={{}}
      hasError={false}
      setHasError={_.noop}
    />
  )

  wrapper.instance().componentWillReceiveProps({ location })

  expect(dispatch).toHaveBeenCalledTimes(1)
})

it('should trigger getting the entity when props change and a different entity is specified', () => {
  const dispatch = jest.fn()
  const setHasError = jest.fn()

  const wrapper = shallow(
    <EntityPage
      entityType={entityType.TALENT}
      viewing
      entityId='some-id'
      entity={null}
      getInProgress={false}
      getFailed={false}
      gettingTags={false}
      component={SomeComponent}
      dispatch={dispatch}
      match={{}}
      location={{ path: '/first' }}
      history={{}}
      hasError={false}
      setHasError={setHasError}
    />
  )

  wrapper.instance().componentWillReceiveProps({
    location: { path: '/second' },
    entityType: entityType.TALENT,
    entityId: 'some-other-id',
    dispatch
  })

  expect(setHasError).toHaveBeenCalledWith(false)

  expect(dispatch).toHaveBeenCalledWith(
    entityActions.getEntity(entityType.TALENT, 'some-id')
  )
})

it('should handle cancelling the entity edit', () => {
  const history = { goBack: jest.fn() }
  const event = { preventDefault: jest.fn() }

  const wrapper = shallow(
    <EntityPage
      entityType={entityType.TALENT}
      viewing={false}
      entityId='some-id'
      entity={new FullTalent({ id: 'some-id' })}
      getInProgress={false}
      getFailed={false}
      gettingTags={false}
      component={SomeComponent}
      dispatch={_.noop}
      match={{}}
      location={{}}
      history={history}
      hasError={false}
      setHasError={_.noop}
    />
  )

  wrapper.find(SomeComponent).prop('onCancel')(event)

  expect(event.preventDefault).toHaveBeenCalled()
  expect(history.goBack).toHaveBeenCalled()
})
