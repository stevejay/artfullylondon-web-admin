import React from 'react'
import { shallow } from 'enzyme'

import { FullVenue } from '_src/entities/venue'
import EntityDescription from '_src/components/entity/description'

it('should render correctly', () => {
  const mockEntity = new FullVenue({})
  mockEntity.getLinkByType = jest.fn().mockReturnValue('https://wikipedia/link')

  mockEntity.createFormattedDescription = jest
    .fn()
    .mockReturnValue('Some description.')

  const wrapper = shallow(<EntityDescription entity={mockEntity} />)

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when there is no wikipedia link', () => {
  const mockEntity = new FullVenue({})
  mockEntity.getLinkByType = jest.fn().mockReturnValue(null)

  mockEntity.createFormattedDescription = jest
    .fn()
    .mockReturnValue('Some description.')

  const wrapper = shallow(<EntityDescription entity={mockEntity} />)

  expect(wrapper).toMatchSnapshot()
})

it('should not update', () => {
  const mockEntity = new FullVenue({})
  mockEntity.getLinkByType = jest.fn().mockReturnValue(null)
  mockEntity.createFormattedDescription = jest.fn().mockReturnValue('')

  const wrapper = shallow(<EntityDescription entity={mockEntity} />)

  const result = wrapper.instance().shouldComponentUpdate()
  expect(result).toEqual(false)
})
