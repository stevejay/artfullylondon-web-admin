import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import { ImageEditorForm } from '_src/containers/forms/image-editor'

it('should render correctly', () => {
  const wrapper = shallow(
    <ImageEditorForm
      pristine
      submitting={false}
      handleSubmit={_.noop}
      onSubmit={_.noop}
      reset={_.noop}
      constraint={{
        imageUrl: { length: { maximum: 50 } },
        copyright: { length: { maximum: 50 } }
      }}
      error={null}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
