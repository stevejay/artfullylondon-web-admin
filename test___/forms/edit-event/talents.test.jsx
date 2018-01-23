import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import {
  EditEventTalentsForm
} from '_src/containers/forms/edit-event/talents'

it('should render correctly', () => {
  const wrapper = shallow(
    <EditEventTalentsForm
      initialValues={{}}
      isEdit={false}
      submitting={false}
      error={null}
      linkEditorIsPristine
      handleSubmit={_.noop}
      onSubmit={_.noop}
      onCancel={_.noop}
      previousPage={_.noop}
      changeAction={_.noop}
      createTalentForEvent={_.noop}
      addNotification={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
