import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import EditorMapField from './editor-map-field'

it('should render correctly', () => {
  const wrapper = shallow(
    <EditorMapField
      label='The Label'
      input={{ value: { lat: 11, lng: 22 }, onChange: _.noop }}
      meta={{ touched: false, error: null }}
      defaultCenter={{ lat: 33, lng: 44 }}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

describe('shouldComponentUpdate', () => {
  it('should not update when props have not changed', () => {
    const value = { lat: 11, lng: 22 }

    const wrapper = shallow(
      <EditorMapField
        label='The Label'
        input={{ value, onChange: _.noop }}
        meta={{ touched: false, error: null }}
        defaultCenter={{ lat: 33, lng: 44 }}
        disabled={false}
      />
    )

    const result = wrapper.instance().shouldComponentUpdate({
      input: { value },
      meta: { touched: false, error: null },
      disabled: false
    })

    expect(result).toEqual(false)
  })

  it('should update when props have changed', () => {
    const value = { lat: 11, lng: 22 }

    const wrapper = shallow(
      <EditorMapField
        label='The Label'
        input={{ value, onChange: _.noop }}
        meta={{ touched: false, error: null }}
        defaultCenter={{ lat: 33, lng: 44 }}
        disabled={false}
      />
    )

    const result = wrapper.instance().shouldComponentUpdate({
      input: { value },
      meta: { touched: false, error: null },
      disabled: true
    })

    expect(result).toEqual(true)
  })
})
