import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import LinksField from '_src/components/links/field'

it('should render correctly', () => {
  const wrapper = shallow(
    <LinksField
      label='The Label'
      input={{
        value: [
          {
            key: 'some-key',
            type: 'Facebook',
            url: 'http://some/url'
          }
        ],
        onChange: _.noop
      }}
      meta={{ touched: false, error: null }}
      parentFormName='TheParentFormName'
      onAddLink={_.noop}
      onDeleteLink={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

describe('shouldComponentUpdate', () => {
  it('should not update when props have not changed', () => {
    const value = [{ key: 'key', type: 'Facebook', url: 'http://some/url' }]

    const wrapper = shallow(
      <LinksField
        label='The Label'
        input={{
          value,
          onChange: _.noop
        }}
        meta={{ touched: false, error: null }}
        parentFormName='TheParentFormName'
        onAddLink={_.noop}
        onDeleteLink={_.noop}
      />
    )

    const result = wrapper.instance().shouldComponentUpdate({
      input: { value },
      meta: { touched: false, error: null }
    })

    expect(result).toEqual(false)
  })

  it('should update when props have changed', () => {
    const value = [{ key: 'key', type: 'Facebook', url: 'http://some/url' }]

    const wrapper = shallow(
      <LinksField
        label='The Label'
        input={{
          value,
          onChange: _.noop
        }}
        meta={{ touched: false, error: null }}
        parentFormName='TheParentFormName'
        onAddLink={_.noop}
        onDeleteLink={_.noop}
      />
    )

    const result = wrapper.instance().shouldComponentUpdate({
      input: { value },
      meta: { touched: true, error: null }
    })

    expect(result).toEqual(true)
  })
})
