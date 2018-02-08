import React from 'react'
import _ from 'lodash'

import {
  EntityEditOrCreatePage
} from '_src/modules/entity/pages/edit-or-create'
import * as entityActions from '_src/modules/entity/actions'

class EditComponent extends React.Component {
  render () {
    return <div id='component' />
  }
}

it('should render correctly when get entity failed', () => {
  const wrapper = shallow(
    <EntityEditOrCreatePage
      entityType='talent'
      entityId='some-id'
      entity={null}
      getInProgress={false}
      getFailed
      component={EditComponent}
      dispatch={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when get is in progress', () => {
  const wrapper = shallow(
    <EntityEditOrCreatePage
      entityType='talent'
      entityId='some-id'
      entity={null}
      getInProgress
      getFailed={false}
      component={EditComponent}
      dispatch={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when has no entity', () => {
  const wrapper = shallow(
    <EntityEditOrCreatePage
      entityType='talent'
      entityId='some-id'
      entity={null}
      getInProgress={false}
      getFailed={false}
      component={EditComponent}
      dispatch={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when has an entity', () => {
  const wrapper = shallow(
    <EntityEditOrCreatePage
      entityType='talent'
      entityId='some-id'
      entity={{ id: 'some-id', entityType: 'talent' }}
      getInProgress={false}
      getFailed={false}
      component={EditComponent}
      dispatch={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should trigger getting the entity on construction when editing an entity', () => {
  const dispatch = jest.fn()

  shallow(
    <EntityEditOrCreatePage
      entityType='talent'
      entityId='some-id'
      entity={null}
      getInProgress={false}
      getFailed={false}
      component={EditComponent}
      dispatch={dispatch}
    />
  )

  expect(dispatch).toHaveBeenCalledWith(
    entityActions.getEntityForEdit('talent', 'some-id')
  )
})

it('should trigger getting the entity on construction when creating an entity', () => {
  const dispatch = jest.fn()

  shallow(
    <EntityEditOrCreatePage
      entityType='talent'
      entityId={null}
      entity={null}
      getInProgress={false}
      getFailed={false}
      component={EditComponent}
      dispatch={dispatch}
    />
  )

  expect(dispatch).toHaveBeenCalledWith(
    entityActions.resetEntityForEdit('talent')
  )
})

it('should not trigger getting the entity when props change but the same entity is specified', () => {
  const dispatch = jest.fn()

  const wrapper = shallow(
    <EntityEditOrCreatePage
      entityType='talent'
      entityId='some-id'
      entity={null}
      getInProgress={false}
      getFailed={false}
      component={EditComponent}
      dispatch={dispatch}
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
    <EntityEditOrCreatePage
      entityType='talent'
      entityId='some-id'
      entity={null}
      getInProgress={false}
      getFailed={false}
      component={EditComponent}
      dispatch={dispatch}
    />
  )

  wrapper.instance().componentWillReceiveProps({
    entityType: 'talent',
    entityId: 'some-other-id'
  })

  expect(dispatch).toHaveBeenCalledTimes(2)

  expect(dispatch).toHaveBeenCalledWith(
    entityActions.getEntityForEdit('talent', 'some-other-id')
  )
})
