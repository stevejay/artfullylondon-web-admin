import React from 'react'
import ReactShallowRenderer from 'react-test-renderer/shallow'

import Page from '_src/components/page'

it('should render correctly', () => {
  const renderer = new ReactShallowRenderer()
  renderer.render(<Page><div id='child' /></Page>)
  expect(renderer.getRenderOutput()).toMatchSnapshot()
})
