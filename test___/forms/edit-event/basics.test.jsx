import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import { EditEventBasicsForm } from '_src/containers/forms/edit-event/basics'
import * as eventConstants from '_src/constants/event'

it('should render correctly', () => {
  const wrapper = shallow(
    <EditEventBasicsForm
      initialValues={{}}
      isEdit={false}
      eventTypeValue={eventConstants.EVENT_TYPE_PERFORMANCE}
      bookingTypeValue={eventConstants.BOOKING_TYPE_REQUIRED}
      costTypeValue={eventConstants.COST_TYPE_FREE}
      dateFromValue='2017/01/18'
      occurrenceTypeValue={eventConstants.OCCURRENCE_TYPE_BOUNDED}
      validStatuses={[]}
      getEventSeriesSubEntityInProgress={false}
      getVenueSubEntityInProgress={false}
      submitting={false}
      error={null}
      handleSubmit={_.noop}
      onSubmit={_.noop}
      onCancel={_.noop}
      constraint={{
        name: { length: { maximum: 10 } },
        venueGuidance: { length: { maximum: 20 } },
        summary: { length: { maximum: 30 } },
        descriptionCredit: { length: { maximum: 40 } },
        weSay: { length: { maximum: 50 } },
        costFrom: { length: { maximum: 60 } },
        costTo: { length: { maximum: 70 } }
      }}
      getSubEntity={_.noop}
      showModal={_.noop}
      linkActions={{}}
      change={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
