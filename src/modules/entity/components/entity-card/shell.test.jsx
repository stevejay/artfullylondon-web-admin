import React from 'react'
import _ from 'lodash'

import EntityCardShell from './shell'

it('should render correctly', () => {
  const wrapper = shallow(
    <EntityCardShell
      entity={{
        id: 'some-id',
        entityType: 'venue',
        entityTypeLabel: 'The Label',
        url: 'http://some/url',
        image: '12345678',
        imageRatio: 2
      }}
      onImageLoad={_.noop}
    >
      <div id='child' />
    </EntityCardShell>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should handle a click on the card', () => {
  const stopPropagation = jest.fn()

  const wrapper = shallow(
    <EntityCardShell
      entity={{
        id: 'some-id',
        entityType: 'venue',
        entityTypeLabel: 'The Label',
        url: 'http://some/url',
        image: '12345678',
        imageRatio: 2
      }}
      onImageLoad={_.noop}
    >
      <div id='child' />
    </EntityCardShell>
  )

  wrapper.find('article').simulate('click', { stopPropagation })

  expect(stopPropagation).toHaveBeenCalled()
})

describe('shouldComponentUpdate', () => {
  it('should not update when props have not changed', () => {
    const entity = {
      id: 'some-id',
      entityType: 'venue',
      entityTypeLabel: 'The Label',
      url: 'http://some/url',
      image: '12345678',
      imageRatio: 2
    }

    const wrapper = shallow(
      <EntityCardShell entity={entity} onImageLoad={_.noop}>
        <div id='child' />
      </EntityCardShell>
    )

    const result = wrapper.instance().shouldComponentUpdate({ entity })

    expect(result).toEqual(false)
  })

  it('should update when props have changed', () => {
    const wrapper = shallow(
      <EntityCardShell
        entity={{
          id: 'some-id',
          entityType: 'venue',
          entityTypeLabel: 'The Label',
          url: 'http://some/url',
          image: '12345678',
          imageRatio: 2
        }}
        onImageLoad={_.noop}
      >
        <div id='child' />
      </EntityCardShell>
    )

    const result = wrapper.instance().shouldComponentUpdate({ entity: {} })

    expect(result).toEqual(true)
  })
})
