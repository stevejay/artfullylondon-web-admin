import React from 'react'
import { shallow } from 'enzyme'

import EntityImageCarousel from '_admin/components/entity/image-carousel'

it('should render correctly', () => {
  const wrapper = shallow(
    <EntityImageCarousel
      images={[
        {
          id: 'some-id',
          ratio: 2,
          copyright: 'The Copyright',
          dominantColor: 'AAAAAA'
        }
      ]}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
