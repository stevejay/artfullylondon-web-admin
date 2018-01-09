import React from 'react'
import { shallow } from 'enzyme'

import EntityImageCredit from '_src/components/entity/image-credit'

it('should render correctly', () => {
  const wrapper = shallow(<EntityImageCredit credit='The Credit' />)
  expect(wrapper).toMatchSnapshot()
})
