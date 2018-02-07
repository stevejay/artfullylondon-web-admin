import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import {
  TalentMatchesFoundModal
} from '_src/containers/modals/talent-matches-found'

it('should render correctly', () => {
  const wrapper = shallow(
    <TalentMatchesFoundModal
      onHide={_.noop}
      items={[
        { firstNames: 'First', lastName: 'Last', commonRole: 'Some role' }
      ]}
      values={{}}
      parentFormName='ParentFormName'
      createTalentForEvent={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
