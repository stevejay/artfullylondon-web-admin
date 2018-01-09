import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import { TagEditorForm } from '_src/containers/forms/tag-editor'

it('should render correctly', () => {
  const wrapper = shallow(
    <TagEditorForm
      pristine
      submitting={false}
      handleSubmit={_.noop}
      onSubmit={_.noop}
      reset={_.noop}
      tagType='medium'
      constraint={{ label: { length: { maximum: 10 } } }}
      error={null}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
