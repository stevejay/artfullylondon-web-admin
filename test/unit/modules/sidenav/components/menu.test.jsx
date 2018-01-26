import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import Menu from '_src/modules/sidenav/components/menu'

it('should render correctly when closed', () => {
  const wrapper = shallow(
    <Menu
      id='some-id'
      label='The Label'
      onExpanderChange={_.noop}
      onLinkClick={_.noop}
      items={[
        {
          label: 'Label A',
          path: '/path/a'
        }
      ]}
      idOfOpenMenu='some-other-id'
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when open', () => {
  const wrapper = shallow(
    <Menu
      id='some-id'
      label='The Label'
      onExpanderChange={_.noop}
      onLinkClick={_.noop}
      items={[
        {
          label: 'Label A',
          path: '/path/a'
        }
      ]}
      idOfOpenMenu='some-id'
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should not update when props have not changed', () => {
  const wrapper = shallow(
    <Menu
      id='some-id'
      label='The Label'
      onExpanderChange={_.noop}
      onLinkClick={_.noop}
      items={[
        {
          label: 'Label A',
          path: '/path/a'
        }
      ]}
      idOfOpenMenu='some-id'
    />
  )

  const result = wrapper
    .instance()
    .shouldComponentUpdate({ idOfOpenMenu: 'some-id' })

  expect(result).toEqual(false)
})

it('should update when props have changed', () => {
  const wrapper = shallow(
    <Menu
      id='some-id'
      label='The Label'
      onExpanderChange={_.noop}
      onLinkClick={_.noop}
      items={[
        {
          label: 'Label A',
          path: '/path/a'
        }
      ]}
      idOfOpenMenu='some-id'
    />
  )

  const result = wrapper
    .instance()
    .shouldComponentUpdate({ idOfOpenMenu: 'some-other-id' })

  expect(result).toEqual(true)
})
