import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import TimesField from '_src/components/times/field'

it('should render correctly', () => {
  const wrapper = shallow(
    <TimesField
      label='The Label'
      input={{
        value: [{ key: 'some-key' }],
        onChange: _.noop
      }}
      meta={{
        touched: false,
        error: null
      }}
      formComponent={() => 'div'}
      itemComponent={() => 'span'}
      constraint={{}}
      parentFormName='TheParentFormName'
      timesRangesOptions={[]}
      minDate='2016/01/18'
      maxDate='2017/01/18'
      onSubmit={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
