import React from 'react'
import _ from 'lodash'

import { TagSelector } from './tag-selector'

it('should render correctly when not showing the add tag modal', () => {
  const wrapper = shallow(
    <TagSelector
      tagType='medium'
      options={[{ id: 'a', label: 'A' }]}
      label='The Label'
      name='theName'
      onAddTag={_.noop}
      showing={false}
      setShowing={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when showing the add tag modal', () => {
  const wrapper = shallow(
    <TagSelector
      tagType='medium'
      options={[{ id: 'a', label: 'A' }]}
      label='The Label'
      name='theName'
      onAddTag={_.noop}
      showing
      setShowing={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
