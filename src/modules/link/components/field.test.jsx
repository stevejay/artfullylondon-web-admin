import React from 'react'
import _ from 'lodash'

import { LinksField } from './field'
import linkType from '_src/entities/types/link-type'
import * as linkActions from '../actions'
import AddLinkForm from '../forms/add-link'
import LinksGridRow from './grid-row'

it('should render correctly', () => {
  const wrapper = shallow(
    <LinksField
      label='The Label'
      parentFormName='TheParentFormName'
      input={{
        value: [
          {
            key: 'some-key',
            type: linkType.FACEBOOK,
            url: 'http://some/url'
          }
        ],
        onChange: _.noop
      }}
      meta={{ touched: false, error: null }}
      dispatch={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should handle adding a link', () => {
  const dispatch = jest.fn()

  const wrapper = shallow(
    <LinksField
      label='The Label'
      parentFormName='TheParentFormName'
      input={{
        value: [
          {
            key: 'some-id',
            id: 'some-id',
            type: linkType.FACEBOOK,
            url: 'http://some/url'
          }
        ],
        onChange: _.noop
      }}
      meta={{ touched: false, error: null }}
      dispatch={dispatch}
    />
  )

  wrapper.find(AddLinkForm).prop('onSubmit')({ url: '/new/url' })

  expect(dispatch).toHaveBeenCalledWith(
    linkActions.addLink({ url: '/new/url' }, 'TheParentFormName')
  )
})

it('should handle deleting a link', () => {
  const dispatch = jest.fn()

  const wrapper = shallow(
    <LinksField
      label='The Label'
      parentFormName='TheParentFormName'
      input={{
        value: [
          {
            key: 'some-id',
            id: 'some-id',
            type: linkType.FACEBOOK,
            url: 'http://some/url'
          }
        ],
        onChange: _.noop
      }}
      meta={{ touched: false, error: null }}
      dispatch={dispatch}
    />
  )

  wrapper.find(LinksGridRow).at(0).prop('onDelete')('some-id')

  expect(dispatch).toHaveBeenCalledWith(
    linkActions.deleteLink('some-id', 'TheParentFormName')
  )
})

describe('shouldComponentUpdate', () => {
  it('should not update when props have not changed', () => {
    const value = [
      {
        key: 'key',
        type: linkType.FACEBOOK,
        url: 'http://some/url'
      }
    ]

    const wrapper = shallow(
      <LinksField
        label='The Label'
        parentFormName='TheParentFormName'
        input={{
          value,
          onChange: _.noop
        }}
        meta={{ touched: false, error: null }}
        dispatch={_.noop}
      />
    )

    const result = wrapper.instance().shouldComponentUpdate({
      input: { value },
      meta: { touched: false, error: null }
    })

    expect(result).toEqual(false)
  })

  it('should update when props have changed', () => {
    const value = [
      {
        key: 'key',
        type: linkType.FACEBOOK,
        url: 'http://some/url'
      }
    ]

    const wrapper = shallow(
      <LinksField
        label='The Label'
        parentFormName='TheParentFormName'
        input={{
          value,
          onChange: _.noop
        }}
        meta={{ touched: false, error: null }}
        dispatch={_.noop}
      />
    )

    const result = wrapper.instance().shouldComponentUpdate({
      input: { value },
      meta: { touched: true, error: null }
    })

    expect(result).toEqual(true)
  })
})
