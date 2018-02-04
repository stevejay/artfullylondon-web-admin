import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import { LinksEditorForm } from '_src/components/links/editor-form'

it('should render correctly', () => {
  const wrapper = shallow(
    <LinksEditorForm
      pristine
      submitting={false}
      handleSubmit={_.noop}
      onSubmit={_.noop}
      reset={_.noop}
      linkTypeOptions={[]}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
