import React from 'react'
import _ from 'lodash'

import LinksGridRow from './grid-row'
import linkType from '_src/entities/link-type'

it('should render correctly', () => {
  const wrapper = shallow(
    <LinksGridRow
      value={{ type: linkType.FACEBOOK, url: 'http://some/url' }}
      onDelete={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
