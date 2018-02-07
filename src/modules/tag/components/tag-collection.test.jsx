import React from 'react'
import { shallow } from 'enzyme'

import TagCollection from './tag-collection'

it('should render correctly when there are tags', () => {
  const wrapper = shallow(
    <TagCollection
      tags={[
        { id: 'tag-1', label: 'Tag One' },
        { id: 'tag-2', label: 'Tag Two' }
      ]}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when there no tags', () => {
  const wrapper = shallow(<TagCollection tags={[]} />)
  expect(wrapper).toMatchSnapshot()
})
