import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import LinksField from '_src/components/links/field'

it('should render correctly', () => {
  const wrapper = shallow(
    <LinksField
      label='The Label'
      input={{
        value: [
          {
            key: 'some-key',
            type: 'Facebook',
            url: 'http://some/url'
          }
        ],
        onChange: _.noop
      }}
      meta={{
        touched: false,
        error: null
      }}
      parentFormName='TheParentFormName'
      linkActions={{
        addLink: _.noop,
        deleteLink: _.noop
      }}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
