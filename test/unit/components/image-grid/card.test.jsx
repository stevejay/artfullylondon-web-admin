import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import ImageGridCard from '_src/components/image-grid/card'

it('should render correctly when has a copyright', () => {
  const wrapper = shallow(
    <ImageGridCard
      value={{
        key: 'some-key',
        id: 'some-id',
        isMain: false,
        copyright: 'The Copyright',
        ratio: 2
      }}
      entityType='venue'
      onDelete={_.noop}
      onUpdate={_.noop}
      onSetMain={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when is not main', () => {
  const wrapper = shallow(
    <ImageGridCard
      value={{
        key: 'some-key',
        id: 'some-id',
        isMain: false,
        ratio: 2
      }}
      entityType='venue'
      onDelete={_.noop}
      onUpdate={_.noop}
      onSetMain={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when is main', () => {
  const wrapper = shallow(
    <ImageGridCard
      value={{
        key: 'some-key',
        id: 'some-id',
        isMain: true,
        ratio: 2
      }}
      entityType='venue'
      onDelete={_.noop}
      onUpdate={_.noop}
      onSetMain={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
