import React from 'react'
import { shallow } from 'enzyme'

import EntityImageCredit from '_src/components/entity/image-credit'

it('should render correctly when there is a credit', () => {
  const wrapper = shallow(<EntityImageCredit credit='The Credit' />)
  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when there is no credit', () => {
  const wrapper = shallow(<EntityImageCredit />)
  expect(wrapper).toMatchSnapshot()
})
