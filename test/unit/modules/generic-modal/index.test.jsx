import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import { GenericModal } from '_src/modules/generic-modal'

it('should render correctly', () => {
  const wrapper = shallow(
    <GenericModal
      showingModal
      modalProps={{}}
      modalComponent={() => <div />}
      modalComponentProps={{}}
      hideModal={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
