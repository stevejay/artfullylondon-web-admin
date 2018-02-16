import React from 'react'

import OpeningTimes from './opening-times'
import { FullVenue } from '_src/entities/venue'

it('should render empty times details correctly', () => {
  const entity = new FullVenue({})
  entity.createTimesDetailsOn = jest.fn().mockReturnValue(null)

  const wrapper = shallow(<OpeningTimes dateStr='2017/01/20' entity={entity} />)

  expect(wrapper).toMatchSnapshot()
  expect(entity.createTimesDetailsOn).toHaveBeenCalledWith('2017/01/20')
})

it('should render non-empty times details correctly', () => {
  const entity = new FullVenue({})

  entity.createTimesDetailsOn = jest.fn().mockReturnValue({
    regularTimesHeader: 'Regular Times Header',
    additionalTimesHeader: 'Additional Times Header',
    specialTimesHeader: 'Special Times Header',
    times: {
      regularTimes: [{ label: 'Regular 1', times: [] }],
      additionalTimes: [{ label: 'Additional 1', times: [] }],
      specialTimes: [
        { tagLabel: 'Special tag', times: [{ label: 'Special 1 ' }] }
      ],
      closures: [{ label: 'Closure 1', times: [] }]
    }
  })

  const wrapper = shallow(<OpeningTimes dateStr='2017/01/20' entity={entity} />)

  expect(wrapper).toMatchSnapshot()
})

it('should render additional only times details correctly', () => {
  const entity = new FullVenue({})

  entity.createTimesDetailsOn = jest.fn().mockReturnValue({
    regularTimesHeader: 'Regular Times Header',
    additionalTimesHeader: 'Additional Times Header',
    times: {
      regularTimes: [],
      additionalTimes: [{ label: 'Additional 1', times: [] }],
      specialTimes: [],
      closures: []
    }
  })

  const wrapper = shallow(<OpeningTimes dateStr='2017/01/20' entity={entity} />)

  expect(wrapper).toMatchSnapshot()
})
