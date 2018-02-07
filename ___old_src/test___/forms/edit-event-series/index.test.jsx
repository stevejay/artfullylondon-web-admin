import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import { EditEventSeriesForm } from '_src/containers/forms/edit-event-series'

it('should render correctly', () => {
  const wrapper = shallow(
    <EditEventSeriesForm
      initialValues={{}}
      isEdit={false}
      validStatuses={[]}
      submitting={false}
      error={null}
      handleSubmit={_.noop}
      onSubmit={_.noop}
      onCancel={_.noop}
      constraint={{
        name: { length: { maximum: 10 } },
        occurrence: { length: { maximum: 20 } },
        summary: { length: { maximum: 30 } },
        descriptionCredit: { length: { maximum: 40 } },
        weSay: { length: { maximum: 50 } }
      }}
      imageActions={{}}
      linkActions={{}}
      showModal={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
