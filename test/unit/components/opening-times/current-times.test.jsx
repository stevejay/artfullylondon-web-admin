import React from 'react'
import { shallow } from 'enzyme'

import OpeningTimesCurrentTimes
  from '_admin/components/opening-times/current-times'
import { FullVenue } from '_admin/entities/venue'

it('should render correctly', () => {
  const mockEntity = new FullVenue({})

  mockEntity.createTimesDescriptionForDate = jest
    .fn()
    .mockReturnValueOnce('Today Description')
    .mockReturnValueOnce('Tomorrow Description')

  const wrapper = shallow(
    <OpeningTimesCurrentTimes
      dateStr='2017/01/20'
      timeStr='17:00'
      entity={mockEntity}
      namedClosuresLookup={{}}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when no descriptions', () => {
  const mockEntity = new FullVenue({})

  mockEntity.createTimesDescriptionForDate = jest.fn().mockReturnValue(null)

  const wrapper = shallow(
    <OpeningTimesCurrentTimes
      dateStr='2017/01/20'
      timeStr='17:00'
      entity={mockEntity}
      namedClosuresLookup={{}}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
