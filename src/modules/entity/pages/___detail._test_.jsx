import React from 'react'
import _ from 'lodash'

import { EntityDetailPage } from '_src/modules/entity/pages/detail'
import { FullEvent } from '_src/entities/event'
import { FullEventSeries } from '_src/entities/event-series'
import { FullTalent } from '_src/entities/talent'
import { FullVenue } from '_src/entities/venue'
import * as entityActions from '_src/modules/entity/actions'

class DetailComponent extends React.Component {
  render () {
    return <div id='component' />
  }
}

it('should render correctly when get entity failed', () => {
  const wrapper = shallow(
    <EntityDetailPage
      entityType='talent'
      entityId='some-id'
      entity={null}
      getInProgress={false}
      getFailed
      component={DetailComponent}
      dispatch={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when get is in progress', () => {
  const wrapper = shallow(
    <EntityDetailPage
      entityType='talent'
      entityId='some-id'
      entity={null}
      getInProgress
      getFailed={false}
      component={DetailComponent}
      dispatch={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when has no entity', () => {
  const wrapper = shallow(
    <EntityDetailPage
      entityType='talent'
      entityId='some-id'
      entity={null}
      getInProgress={false}
      getFailed={false}
      component={DetailComponent}
      dispatch={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when has an entity but it has a different id', () => {
  const wrapper = shallow(
    <EntityDetailPage
      entityType='talent'
      entityId='some-id'
      entity={new FullTalent({ id: 'some-other-id' })}
      getInProgress={false}
      getFailed={false}
      component={DetailComponent}
      dispatch={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when has an entity', () => {
  const wrapper = shallow(
    <EntityDetailPage
      entityType='talent'
      entityId='some-id'
      entity={new FullTalent({ id: 'some-id' })}
      getInProgress={false}
      getFailed={false}
      component={DetailComponent}
      dispatch={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should trigger getting the entity on construction', () => {
  const dispatch = jest.fn()

  shallow(
    <EntityDetailPage
      entityType='talent'
      entityId='some-id'
      entity={null}
      getInProgress={false}
      getFailed={false}
      component={DetailComponent}
      dispatch={dispatch}
    />
  )

  expect(dispatch).toHaveBeenCalledWith(
    entityActions.getEntity('talent', 'some-id')
  )
})

it('should not trigger getting the entity when props change but the same entity is specified', () => {
  const dispatch = jest.fn()

  const wrapper = shallow(
    <EntityDetailPage
      entityType='talent'
      entityId='some-id'
      entity={null}
      getInProgress={false}
      getFailed={false}
      component={DetailComponent}
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
    <EntityDetailPage
      entityType='talent'
      entityId='some-id'
      entity={null}
      getInProgress={false}
      getFailed={false}
      component={DetailComponent}
      dispatch={dispatch}
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
