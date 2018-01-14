import React from 'react'
import ReactShallowRenderer from 'react-test-renderer/shallow'

import PageHeader from '_src/components/page/header'

it('should render correctly', () => {
  const renderer = new ReactShallowRenderer()
  renderer.render(<PageHeader><div id='child' /></PageHeader>)
  expect(renderer.getRenderOutput()).toMatchSnapshot()
})
