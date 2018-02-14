import React from 'react'
import _ from 'lodash'

import { FullTalent } from '_src/entities/talent'
import { EntityPage } from '_src/modules/entity/pages/entity'
import * as entityActions from '_src/modules/entity/actions'

class SomeComponent extends React.Component {
  render () {
    return <div id='component' />
  }
}

it('should render correctly when get entity failed', () => {
  const wrapper = shallow(
    <EntityPage
      entityType='talent'
      entityId='some-id'
      entity={null}
      getInProgress={false}
      getFailed
      component={SomeComponent}
      dispatch={_.noop}
      match={{}}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when get is in progress', () => {
  const wrapper = shallow(
    <EntityPage
      entityType='talent'
      entityId='some-id'
      entity={null}
      getInProgress
      getFailed={false}
      component={SomeComponent}
      dispatch={_.noop}
      match={{}}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when has no entity', () => {
  const wrapper = shallow(
    <EntityPage
      entityType='talent'
      entityId='some-id'
      entity={null}
      getInProgress={false}
      getFailed={false}
      component={SomeComponent}
      dispatch={_.noop}
      match={{}}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when has an entity', () => {
  const wrapper = shallow(
    <EntityPage
      entityType='talent'
      entityId='some-id'
      entity={new FullTalent({ id: 'some-id' })}
      getInProgress={false}
      getFailed={false}
      component={SomeComponent}
      dispatch={_.noop}
      match={{}}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should trigger getting the entity on construction when editing an entity', () => {
  const dispatch = jest.fn()

  shallow(
    <EntityPage
      entityType='talent'
      entityId='some-id'
      entity={null}
      getInProgress={false}
      getFailed={false}
      component={SomeComponent}
      dispatch={dispatch}
      match={{}}
    />
  )

  expect(dispatch).toHaveBeenCalledWith(
    entityActions.getEntity('talent', 'some-id')
  )
})

it('should trigger getting the entity on construction when creating an entity', () => {
  const dispatch = jest.fn()

  shallow(
    <EntityPage
      entityType='talent'
      entityId={null}
      entity={null}
      getInProgress={false}
      getFailed={false}
      component={SomeComponent}
      dispatch={dispatch}
      match={{}}
    />
  )

  expect(dispatch).toHaveBeenCalledWith(
    entityActions.resetEntityForCreate('talent')
  )
})

it('should not trigger getting the entity when props change but the same entity is specified', () => {
  const dispatch = jest.fn()

  const wrapper = shallow(
    <EntityPage
      entityType='talent'
      entityId='some-id'
      entity={null}
      getInProgress={false}
      getFailed={false}
      component={SomeComponent}
      dispatch={dispatch}
      match={{}}
    />
  )

  wrapper
    .instance()
    .componentWillReceiveProps({ entityType: 'talent', entityId: 'some-id' })

  expect(dispatch).toHaveBeenCalledTimes(1)
})

it('should trigger getting the entity when props change and a different entity is specified', () => {
  const dispatch = jest.fn()

  const wrapper = shallow(
    <EntityPage
      entityType='talent'
      entityId='some-id'
      entity={null}
      getInProgress={false}
      getFailed={false}
      component={SomeComponent}
      dispatch={dispatch}
      match={{}}
    />
  )

  wrapper.instance().componentWillReceiveProps({
    entityType: 'talent',
    entityId: 'some-other-id'
  })

  expect(dispatch).toHaveBeenCalledTimes(2)

  expect(dispatch).toHaveBeenCalledWith(
    entityActions.getEntity('talent', 'some-other-id')
  )
})
