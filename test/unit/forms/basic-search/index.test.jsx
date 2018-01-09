import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import { BasicSearchForm } from '_src/containers/forms/basic-search'

it('should render correctly', () => {
  const wrapper = shallow(
    <BasicSearchForm
      submitting={false}
      handleSubmit={_.noop}
      submit={_.noop}
      reset={_.noop}
      onSubmit={_.noop}
      initialValues={{
        term: 'The Term',
        date: new Date(123456),
        entityType: 'event',
        skip: 10,
        take: 20
      }}
      entityTypeSelector='venue'
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when has an error', () => {
  const wrapper = shallow(
    <BasicSearchForm
      submitting={false}
      handleSubmit={_.noop}
      submit={_.noop}
      reset={_.noop}
      onSubmit={_.noop}
      error='The Error'
      initialValues={{
        term: 'The Term',
        date: new Date(123456),
        entityType: 'event',
        skip: 10,
        take: 20
      }}
      entityTypeSelector='venue'
    />
  )

  expect(wrapper).toMatchSnapshot()
})
