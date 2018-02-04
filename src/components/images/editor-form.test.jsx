import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import { ImagesEditorForm } from '_src/components/images/editor-form'

it('should render correctly', () => {
  const wrapper = shallow(
    <ImagesEditorForm
      pristine
      submitting={false}
      handleSubmit={_.noop}
      onSubmit={_.noop}
      reset={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
