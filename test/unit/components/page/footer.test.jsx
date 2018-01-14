import React from 'react'
import ReactShallowRenderer from 'react-test-renderer/shallow'

import PageFooter from '_src/components/page/footer'

it('should render correctly', () => {
  const renderer = new ReactShallowRenderer()
  renderer.render(<PageFooter><div id='child' /></PageFooter>)
  expect(renderer.getRenderOutput()).toMatchSnapshot()
})
