import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import UpdateImageModal from '_src/containers/modals/update-image'

it('should render correctly', () => {
  const wrapper = shallow(
    <UpdateImageModal
      onHide={_.noop}
      onSubmit={_.noop}
      formData={{ copyright: 'The Copyright' }}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
