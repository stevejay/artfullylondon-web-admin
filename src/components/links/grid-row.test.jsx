import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import LinksGridRow from '_src/components/links/grid-row'

it('should render correctly', () => {
  const wrapper = shallow(
    <LinksGridRow
      value={{
        type: 'Facebook',
        url: 'http://some/url'
      }}
      onDelete={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
