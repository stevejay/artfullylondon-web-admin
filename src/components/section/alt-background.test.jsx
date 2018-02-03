import React from 'react'
import { shallow } from 'enzyme'

import AltBackgroundSection from '_src/components/section/alt-background'

it('should render correctly', () => {
  const wrapper = shallow(
    <AltBackgroundSection><div id='child' /></AltBackgroundSection>
  )

  expect(wrapper).toMatchSnapshot()
})
