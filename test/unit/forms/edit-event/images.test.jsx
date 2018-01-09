import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import { EditEventImagesForm } from '_src/containers/forms/edit-event/images'

it('should render correctly', () => {
  const wrapper = shallow(
    <EditEventImagesForm
      initialValues={{}}
      isEdit={false}
      submitting={false}
      error={null}
      imageEditorIsPristine
      handleSubmit={_.noop}
      onSubmit={_.noop}
      onCancel={_.noop}
      previousPage={_.noop}
      imageActions={{}}
      showModal={_.noop}
      addNotification={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
