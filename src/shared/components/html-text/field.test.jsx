import React from 'react'
import _ from 'lodash'

import HtmlTextField from '_src/shared/components/html-text/field'

it('should render correctly', () => {
  const wrapper = shallow(
    <HtmlTextField
      label='The Label'
      input={{ value: 'The Value', onChange: _.noop }}
      meta={{ touched: false, error: null }}
      maxLength={300}
    />
  )

  expect(wrapper).toMatchSnapshot()
})