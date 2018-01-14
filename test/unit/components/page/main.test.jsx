import React from 'react'
import ReactShallowRenderer from 'react-test-renderer/shallow'

import PageMain from '_src/components/page/main'

it('should render correctly', () => {
  const renderer = new ReactShallowRenderer()
  renderer.render(<PageMain><div id='child' /></PageMain>)
  expect(renderer.getRenderOutput()).toMatchSnapshot()
})
