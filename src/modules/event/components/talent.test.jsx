import React from 'react'

import EventTalent from './talent'
import { EventSummaryTalent } from '_src/domain/talent'

it('should render correctly', () => {
  const mockTalent = new EventSummaryTalent({
    id: 'talent-2',
    image: '12345678',
    url: 'http://some/url',
    firstNames: 'First',
    lastName: 'Last'
  })

  mockTalent.createRolesString = jest.fn().mockReturnValue('Roles string')
  mockTalent.hasCharacters = jest.fn().mockReturnValue(true)

  mockTalent.createCharactersString = jest
    .fn()
    .mockReturnValue('Characters string')

  const wrapper = shallow(<EventTalent talent={mockTalent} />)

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when there is no image', () => {
  const mockTalent = new EventSummaryTalent({
    id: 'talent-2',
    url: 'http://some/url',
    firstNames: 'First',
    lastName: 'Last'
  })

  mockTalent.createRolesString = jest.fn().mockReturnValue('Roles string')
  mockTalent.hasCharacters = jest.fn().mockReturnValue(true)

  mockTalent.createCharactersString = jest
    .fn()
    .mockReturnValue('Characters string')

  const wrapper = shallow(<EventTalent talent={mockTalent} />)

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when there are no characters', () => {
  const mockTalent = new EventSummaryTalent({
    id: 'talent-2',
    image: '12345678',
    url: 'http://some/url',
    firstNames: 'First',
    lastName: 'Last'
  })

  mockTalent.createRolesString = jest.fn().mockReturnValue('Roles string')
  mockTalent.hasCharacters = jest.fn().mockReturnValue(false)

  const wrapper = shallow(<EventTalent talent={mockTalent} />)

  expect(wrapper).toMatchSnapshot()
})
