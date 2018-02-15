import React from 'react'
import _ from 'lodash'

import ImageGridCard from '_src/modules/image/components/image-grid-card'

it('should render correctly when the image has a copyright', () => {
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

it('should render correctly when the image is not the main image', () => {
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

it('should render correctly when the image is the main image', () => {
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

describe('shouldComponentUpdate', () => {
  it('should not update when props have not changed', () => {
    const value = { key: 'key', id: 'id1', isMain: false, ratio: 2 }

    const wrapper = shallow(
      <ImageGridCard
        value={value}
        entityType='venue'
        onDelete={_.noop}
        onUpdate={_.noop}
        onSetMain={_.noop}
      />
    )

    const result = wrapper.instance().shouldComponentUpdate({ value })

    expect(result).toEqual(false)
  })

  it('should update when props have changed', () => {
    const wrapper = shallow(
      <ImageGridCard
        value={{ key: 'key', id: 'id1', isMain: false, ratio: 2 }}
        entityType='venue'
        onDelete={_.noop}
        onUpdate={_.noop}
        onSetMain={_.noop}
      />
    )

    const result = wrapper
      .instance()
      .shouldComponentUpdate({ value: { id: 'id2' } })

    expect(result).toEqual(true)
  })
})

it('should handle the edit option being clicked', () => {
  const handleUpdate = jest.fn()
  const value = { key: 'key', id: 'id1', isMain: false, ratio: 2 }

  const wrapper = shallow(
    <ImageGridCard
      value={value}
      entityType='venue'
      onDelete={_.noop}
      onUpdate={handleUpdate}
      onSetMain={_.noop}
    />
  )

  wrapper.find('a').at(2).simulate('click')

  expect(handleUpdate).toHaveBeenCalledWith(value)
})

it('should handle the delete option being clicked', () => {
  const handleDelete = jest.fn()
  const preventDefault = jest.fn()

  const wrapper = shallow(
    <ImageGridCard
      value={{ key: 'key', id: 'id1', isMain: false, ratio: 2 }}
      entityType='venue'
      onDelete={handleDelete}
      onUpdate={_.noop}
      onSetMain={_.noop}
    />
  )

  wrapper.find('a').at(1).simulate('click', { preventDefault })

  expect(preventDefault).toHaveBeenCalled()
  expect(handleDelete).toHaveBeenCalledWith('id1')
})

it('should handle the set as main option being clicked', () => {
  const handleSetMain = jest.fn()
  const preventDefault = jest.fn()

  const wrapper = shallow(
    <ImageGridCard
      value={{ key: 'key', id: 'id1', isMain: false, ratio: 2 }}
      entityType='venue'
      onDelete={_.noop}
      onUpdate={_.noop}
      onSetMain={handleSetMain}
    />
  )

  wrapper.find('a').at(0).simulate('click', { preventDefault })

  expect(preventDefault).toHaveBeenCalled()
  expect(handleSetMain).toHaveBeenCalledWith('id1')
})
