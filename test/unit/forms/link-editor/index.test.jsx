import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import { LinkEditorForm } from '_src/containers/forms/link-editor'

it('should render correctly', () => {
  const wrapper = shallow(
    <LinkEditorForm
      pristine
      submitting={false}
      handleSubmit={_.noop}
      onSubmit={_.noop}
      reset={_.noop}
      constraint={{ linkUrl: { length: { maximum: 100 } } }}
      linkTypeOptions={['options']}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
