import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import {
  TALENT_TYPE_INDIVIDUAL,
  TALENT_TYPE_GROUP
} from '_src/constants/talent'
import { ACTIVE_STATUS } from '_src/constants/entity'
import { CreateTalentForm } from '_src/containers/forms/create-talent'

it('should render correctly when creating an individual talent', () => {
  const wrapper = shallow(
    <CreateTalentForm
      submitting={false}
      handleSubmit={_.noop}
      reset={_.noop}
      onSubmit={_.noop}
      talentTypeValue={TALENT_TYPE_INDIVIDUAL}
      pristine
      error={null}
      constraint={{
        firstNames: { length: { maximum: 20 } },
        lastName: { length: { maximum: 30 } },
        commonRole: { length: { maximum: 40 } }
      }}
      change={_.noop}
      initialValues={{
        status: ACTIVE_STATUS,
        firstNames: '',
        lastName: '',
        talentType: TALENT_TYPE_INDIVIDUAL,
        commonRole: '',
        links: [],
        images: [],
        weSay: '',
        version: 0
      }}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when creating a group talent', () => {
  const wrapper = shallow(
    <CreateTalentForm
      submitting={false}
      handleSubmit={_.noop}
      reset={_.noop}
      onSubmit={_.noop}
      talentTypeValue={TALENT_TYPE_GROUP}
      pristine
      error={null}
      constraint={{
        firstNames: { length: { maximum: 20 } },
        lastName: { length: { maximum: 30 } },
        commonRole: { length: { maximum: 40 } }
      }}
      change={_.noop}
      initialValues={{
        status: ACTIVE_STATUS,
        firstNames: '',
        lastName: '',
        talentType: TALENT_TYPE_INDIVIDUAL,
        commonRole: '',
        links: [],
        images: [],
        weSay: '',
        version: 0
      }}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
