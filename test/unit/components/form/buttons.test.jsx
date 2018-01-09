import React from 'react'
import { shallow } from 'enzyme'

import FormButtons from '_admin/components/form/buttons'

it('should render correctly when not submitting', () => {
  const wrapper = shallow(
    <FormButtons submitting={false} submitLabel='Submitting' />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when submitting', () => {
  const wrapper = shallow(<FormButtons submitting submitLabel='Submitting' />)

  expect(wrapper).toMatchSnapshot()
})
