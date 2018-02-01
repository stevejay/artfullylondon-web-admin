import React from 'react'
import { shallow } from 'enzyme'

import { FullVenue } from '_src/entities/venue'
import EntityExternalLinks from '_src/components/entity/external-links'
import {
  LINK_TYPE_FACEBOOK,
  LINK_TYPE_TWITTER,
  LINK_TYPE_INSTAGRAM
} from '_src/constants/link'

it('should render correctly when there are no links', () => {
  const entity = new FullVenue({ links: [] })
  const wrapper = shallow(<EntityExternalLinks entity={entity} />)
  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when there is an email', () => {
  const entity = new FullVenue({ email: 'steve@test.com' })
  const wrapper = shallow(<EntityExternalLinks entity={entity} />)
  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when there is a facebook link', () => {
  const entity = new FullVenue({
    links: [{ type: LINK_TYPE_FACEBOOK, url: 'http://facebook/link' }]
  })

  const wrapper = shallow(<EntityExternalLinks entity={entity} />)

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when there is a twitter link', () => {
  const entity = new FullVenue({
    links: [{ type: LINK_TYPE_TWITTER, url: 'http://twitter/link' }]
  })

  const wrapper = shallow(<EntityExternalLinks entity={entity} />)

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when there is an instagram link', () => {
  const entity = new FullVenue({
    links: [{ type: LINK_TYPE_INSTAGRAM, url: 'http://instagram/link' }]
  })

  const wrapper = shallow(<EntityExternalLinks entity={entity} />)

  expect(wrapper).toMatchSnapshot()
})
