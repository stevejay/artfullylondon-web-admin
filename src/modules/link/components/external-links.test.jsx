import React from 'react'

import EntityExternalLinks from './external-links'
import { FullVenue } from '_src/domain/venue'
import linkType from '_src/domain/types/link-type'

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
    links: [{ type: linkType.FACEBOOK, url: 'http://facebook/link' }]
  })

  const wrapper = shallow(<EntityExternalLinks entity={entity} />)

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when there is a twitter link', () => {
  const entity = new FullVenue({
    links: [{ type: linkType.TWITTER, url: 'http://twitter/link' }]
  })

  const wrapper = shallow(<EntityExternalLinks entity={entity} />)

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when there is an instagram link', () => {
  const entity = new FullVenue({
    links: [{ type: linkType.INSTAGRAM, url: 'http://instagram/link' }]
  })

  const wrapper = shallow(<EntityExternalLinks entity={entity} />)

  expect(wrapper).toMatchSnapshot()
})
