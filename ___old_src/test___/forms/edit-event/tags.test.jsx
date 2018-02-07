import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import { EditEventTagsForm } from '_src/containers/forms/edit-event/tags'

it('should render correctly', () => {
  const wrapper = shallow(
    <EditEventTagsForm
      initialValues={{}}
      isEdit={false}
      submitting={false}
      error={null}
      handleSubmit={_.noop}
      onSubmit={_.noop}
      onCancel={_.noop}
      previousPage={_.noop}
      getTagsInProgress={false}
      audienceTags={[{ id: 'audience/a', label: 'A' }]}
      geoTags={[{ id: 'geo/a', label: 'A' }]}
      mediumTags={[{ id: 'medium/a', label: 'A' }]}
      styleTags={[{ id: 'style/a', label: 'A' }]}
      addTag={_.noop}
      showModal={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
