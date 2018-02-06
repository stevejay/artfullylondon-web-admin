import React from 'react'
import _ from 'lodash'

import { AddTagForm } from './add-tag'

it('should render correctly', () => {
  const wrapper = shallow(
    <AddTagForm
      canAddTag
      initialValues={{ label: 'The Label' }}
      pristine
      submitting={false}
      handleSubmit={_.noop}
      onSubmit={_.noop}
      reset={_.noop}
      tagType='medium'
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when text has been entered but the tag cannot currently be added', () => {
  const wrapper = shallow(
    <AddTagForm
      canAddTag={false}
      initialValues={{ label: 'The Label' }}
      pristine={false}
      submitting={false}
      handleSubmit={_.noop}
      onSubmit={_.noop}
      reset={_.noop}
      tagType='medium'
    />
  )

  expect(wrapper).toMatchSnapshot()
})
