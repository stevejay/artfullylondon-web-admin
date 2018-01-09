import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import { EditVenueForm } from '_src/containers/forms/edit-venue'
import * as timeLib from '_src/lib/time'

it('should render correctly', () => {
  timeLib.getTodayDateAsString = jest.fn().mockReturnValue('2017/01/18')

  const wrapper = shallow(
    <EditVenueForm
      initialValues={{}}
      isEdit={false}
      validStatuses={[]}
      submitting={false}
      error={null}
      constraint={{
        name: { length: { maximum: 10 } },
        weSay: { length: { maximum: 10 } },
        address: { length: { maximum: 10 } },
        postcode: { length: { maximum: 10 } },
        email: { length: { maximum: 10 } },
        telephone: { length: { maximum: 10 } },
        notes: { length: { maximum: 10 } }
      }}
      defaultCenter={{ lat: 1, lng: 2 }}
      handleSubmit={_.noop}
      onSubmit={_.noop}
      onCancel={_.noop}
      imageActions={{}}
      linkActions={{}}
      timeActions={{}}
      showModal={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
