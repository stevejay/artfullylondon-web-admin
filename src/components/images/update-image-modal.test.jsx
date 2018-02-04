import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import UpdateImageModal from '_src/components/images/update-image-modal'

it('should render correctly', () => {
  const wrapper = shallow(
    <UpdateImageModal
      show
      initialValues={{ copyright: 'Some copyright' }}
      onHide={_.noop}
      onSubmit={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
