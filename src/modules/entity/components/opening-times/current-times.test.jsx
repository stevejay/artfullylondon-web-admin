import React from 'react'
import { shallow } from 'enzyme'

import OpeningTimesCurrentTimes from './current-times'
import { FullVenue } from '_src/entities/venue'

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

describe('shouldComponentUpdate', () => {
  it('should not update when props have not changed', () => {
    const mockEntity = new FullVenue({})
    mockEntity.createTimesDescriptionForDate = jest.fn()

    const wrapper = shallow(
      <OpeningTimesCurrentTimes
        dateStr='2017/01/20'
        timeStr='17:00'
        entity={mockEntity}
        namedClosuresLookup={{}}
      />
    )

    const result = wrapper.instance().shouldComponentUpdate({
      dateStr: '2017/01/20',
      timeStr: '17:00'
    })

    expect(result).toEqual(false)
  })

  it('should update when props have changed', () => {
    const mockEntity = new FullVenue({})
    mockEntity.createTimesDescriptionForDate = jest.fn()

    const wrapper = shallow(
      <OpeningTimesCurrentTimes
        dateStr='2017/01/20'
        timeStr='17:00'
        entity={mockEntity}
        namedClosuresLookup={{}}
      />
    )

    const result = wrapper.instance().shouldComponentUpdate({
      dateStr: '2017/01/20',
      timeStr: '23:59'
    })

    expect(result).toEqual(true)
  })
})
