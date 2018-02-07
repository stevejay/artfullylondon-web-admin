import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import * as timeLib from '_src/lib/time'
import { EditEventTimesForm } from '_src/containers/forms/edit-event/times'
import {
  OCCURRENCE_TYPE_CONTINUOUS,
  EVENT_TYPE_EXHIBITION
} from '_src/constants/event'

const BASIC_PROPS = {
  initialValues: { venue: {} },
  isEdit: false,
  submitting: false,
  error: null,
  handleSubmit: _.noop,
  onSubmit: _.noop,
  onCancel: _.noop,
  previousPage: _.noop,
  useVenueOpeningTimesValue: false,
  eventType: EVENT_TYPE_EXHIBITION,
  occurrenceType: OCCURRENCE_TYPE_CONTINUOUS,
  dateFrom: '2017/01/18',
  dateTo: '2017/08/28',
  audienceTags: [{ id: 'audience/a', label: 'A' }],
  timesRanges: [],
  showModal: _.noop,
  timeActions: {},
  linkEditorIsPristine: true,
  changeAction: _.noop,
  createTalentForEvent: _.noop,
  addNotification: _.noop
}

it('should render correctly for an exhibition', () => {
  timeLib.getEventTimesFormDisplayFlags = jest.fn().mockReturnValue({
    showUseVenueTimesOption: true,
    showTimesRanges: true,
    showOpeningTimes: true,
    showAdditionalOpeningTimes: true,
    showAdditionalOpeningTimesAsOpeningTimes: true,
    showSpecialOpeningTimes: true,
    showOpeningTimesClosures: true
  })

  timeLib.getTimesRangesOptions = jest.fn().mockReturnValue({
    some: 'options'
  })

  const wrapper = shallow(<EditEventTimesForm {...BASIC_PROPS} />)

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly for a performance', () => {
  timeLib.getEventTimesFormDisplayFlags = jest.fn().mockReturnValue({
    showTimesRanges: true,
    showPerformances: true,
    showAdditionalPerformances: true,
    showAdditionalPerformancesAsPerformances: true,
    showSpecialPerformances: true,
    showPerformancesClosures: true
  })

  timeLib.getTimesRangesOptions = jest.fn().mockReturnValue({
    some: 'options'
  })

  const wrapper = shallow(<EditEventTimesForm {...BASIC_PROPS} />)

  expect(wrapper).toMatchSnapshot()
})
