import React from 'react'
import { shallow } from 'enzyme'

import EntityExternalLinks from '_src/components/entity/external-links'
import {
  LINK_TYPE_FACEBOOK,
  LINK_TYPE_TWITTER,
  LINK_TYPE_INSTAGRAM
} from '_src/constants/link'

it('should render correctly when there are no links', () => {
  const mockLinks = { getLinkByType: jest.fn() }

  const wrapper = shallow(<EntityExternalLinks links={mockLinks} />)

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when there is an email', () => {
  const mockLinks = { getLinkByType: jest.fn() }

  const wrapper = shallow(
    <EntityExternalLinks email='steve@test.com' links={mockLinks} />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when there is a facebook link', () => {
  const mockLinks = {
    getLinkByType: jest
      .fn()
      .mockImplementation(
        arg =>
          (arg === LINK_TYPE_FACEBOOK ? { url: 'http://facebook/link' } : null)
      )
  }

  const wrapper = shallow(<EntityExternalLinks links={mockLinks} />)

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when there is a twitter link', () => {
  const mockLinks = {
    getLinkByType: jest
      .fn()
      .mockImplementation(
        arg =>
          (arg === LINK_TYPE_TWITTER ? { url: 'http://twitter/link' } : null)
      )
  }

  const wrapper = shallow(<EntityExternalLinks links={mockLinks} />)

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when there is an instagram link', () => {
  const mockLinks = {
    getLinkByType: jest
      .fn()
      .mockImplementation(
        arg =>
          (arg === LINK_TYPE_INSTAGRAM
            ? { url: 'http://instagram/link' }
            : null)
      )
  }

  const wrapper = shallow(<EntityExternalLinks links={mockLinks} />)

  expect(wrapper).toMatchSnapshot()
})
