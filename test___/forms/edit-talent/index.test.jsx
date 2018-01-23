import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import { EditTalentForm } from '_src/containers/forms/edit-talent'
import { TALENT_TYPE_INDIVIDUAL } from '_src/constants/talent'

it('should render correctly', () => {
  const wrapper = shallow(
    <EditTalentForm
      initialValues={{}}
      isEdit={false}
      talentTypeValue={TALENT_TYPE_INDIVIDUAL}
      validStatuses={[]}
      submitting={false}
      error={null}
      handleSubmit={_.noop}
      onSubmit={_.noop}
      onCancel={_.noop}
      constraint={{
        firstNames: { length: { maximum: 20 } },
        lastName: { length: { maximum: 30 } },
        commonRole: { length: { maximum: 40 } },
        weSay: { length: { maximum: 50 } }
      }}
      imageActions={{}}
      linkActions={{}}
      showModal={_.noop}
      change={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
