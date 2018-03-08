import React from 'react'
import _ from 'lodash'

import { EditEventTimesForm } from './times'
import * as timeLib from '_src/shared/lib/time'
import eventType from '_src/domain/types/event-type'
import occurrenceType from '_src/domain/types/occurrence-type'

it('should render correctly when creating and no display flags are set', () => {
  timeLib.getEventTimesFormDisplayFlags = jest.fn().mockReturnValue({
    showUseVenueTimesOption: false,
    showTimesRanges: false,
    showAdditionalOpeningTimesAsOpeningTimes: false,
    showOpeningTimes: false,
    showAdditionalOpeningTimes: false,
    showAdditionalPerformancesAsPerformances: false,
    showPerformances: false,
    showAdditionalPerformances: false,
    showSpecialOpeningTimes: false,
    showSpecialPerformances: false,
    showOpeningTimesClosures: false,
    showPerformancesClosures: false
  })

  const wrapper = shallow(
    <EditEventTimesForm
      initialValues={{
        eventType: eventType.PERFORMANCE,
        occurrenceType: occurrenceType.BOUNDED,
        dateFrom: '2017/01/01',
        dateTo: '2018/01/01',
        venue: { id: 'some-venue-id' }
      }}
      isEdit={false}
      useVenueOpeningTimesValue={false}
      timesRangesValue={[{ from: '2017/02/02' }]}
      submitting={false}
      imageEditorIsPristine
      handleSubmit={_.noop}
      onSubmit={_.noop}
      onCancel={_.noop}
      onPreviousPage={_.noop}
      dispatch={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when editing and all display flags are set', () => {
  timeLib.getEventTimesFormDisplayFlags = jest.fn().mockReturnValue({
    showUseVenueTimesOption: true,
    showTimesRanges: true,
    showAdditionalOpeningTimesAsOpeningTimes: true,
    showOpeningTimes: true,
    showAdditionalOpeningTimes: true,
    showAdditionalPerformancesAsPerformances: true,
    showPerformances: true,
    showAdditionalPerformances: true,
    showSpecialOpeningTimes: true,
    showSpecialPerformances: true,
    showOpeningTimesClosures: true,
    showPerformancesClosures: true
  })

  const wrapper = shallow(
    <EditEventTimesForm
      initialValues={{
        eventType: eventType.PERFORMANCE,
        occurrenceType: occurrenceType.BOUNDED,
        dateFrom: '2017/01/01',
        dateTo: '2018/01/01',
        venue: { id: 'some-venue-id' }
      }}
      isEdit
      useVenueOpeningTimesValue={false}
      timesRangesValue={[]}
      submitting={false}
      imageEditorIsPristine
      handleSubmit={_.noop}
      onSubmit={_.noop}
      onCancel={_.noop}
      onPreviousPage={_.noop}
      dispatch={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should invoke getEventTimesFormDisplayFlags with the correct values', () => {
  timeLib.getEventTimesFormDisplayFlags = jest.fn().mockReturnValue({})

  shallow(
    <EditEventTimesForm
      initialValues={{
        eventType: eventType.PERFORMANCE,
        occurrenceType: occurrenceType.BOUNDED,
        dateFrom: '2017/01/01',
        dateTo: '2018/01/01',
        venue: { id: 'some-venue-id' }
      }}
      isEdit={false}
      useVenueOpeningTimesValue={false}
      timesRangesValue={[]}
      submitting={false}
      imageEditorIsPristine
      handleSubmit={_.noop}
      onSubmit={_.noop}
      onCancel={_.noop}
      onPreviousPage={_.noop}
      dispatch={_.noop}
    />
  )

  expect(timeLib.getEventTimesFormDisplayFlags).toHaveBeenCalledWith(
    eventType.PERFORMANCE,
    occurrenceType.BOUNDED,
    '2017/01/01',
    '2018/01/01',
    { id: 'some-venue-id' },
    false
  )
})
