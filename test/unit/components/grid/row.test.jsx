import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import GridRow from '_src/components/grid/row'

it('should render correctly when can delete', () => {
  const wrapper = shallow(
    <GridRow id='some-id' onDelete={_.noop}><div id='child' /></GridRow>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when cannot delete', () => {
  const wrapper = shallow(<GridRow id='some-id'><div id='child' /></GridRow>)
  expect(wrapper).toMatchSnapshot()
})
