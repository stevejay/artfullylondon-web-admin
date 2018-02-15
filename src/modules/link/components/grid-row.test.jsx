import React from 'react'
import _ from 'lodash'

import LinksGridRow from './grid-row'
import * as linkConstants from '_src/constants/link'

it('should render correctly', () => {
  const wrapper = shallow(
    <LinksGridRow
      value={{
        type: linkConstants.LINK_TYPE_FACEBOOK,
        url: 'http://some/url'
      }}
      onDelete={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
