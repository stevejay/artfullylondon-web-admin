import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import {
  TalentMatchesFoundForm
} from '_src/containers/forms/talent-matches-found'

it('should render correctly', () => {
  const wrapper = shallow(
    <TalentMatchesFoundForm
      initialValues={{}}
      handleSubmit={_.noop}
      onSubmit={_.noop}
      onCancel={_.noop}
      talents={[
        {
          id: 'some-id',
          firstNames: 'First',
          lastName: 'Last',
          commonRole: 'Some role'
        }
      ]}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
