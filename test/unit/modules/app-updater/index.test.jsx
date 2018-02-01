import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import { AppUpdater } from '_src/modules/app-updater'
import * as appActions from '_src/store/actions/app'
import Button from '_src/components/button'

it('should render correctly when should not update', () => {
  const wrapper = shallow(<AppUpdater shouldUpdate={false} dispatch={_.noop} />)
  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when should update', () => {
  const wrapper = shallow(<AppUpdater shouldUpdate dispatch={_.noop} />)
  expect(wrapper).toMatchSnapshot()
})

it('should invoke the update action when the update button is clicked', () => {
  const dispatch = jest.fn()

  const wrapper = shallow(<AppUpdater shouldUpdate dispatch={dispatch} />)
  wrapper.find(Button).simulate('click')

  expect(dispatch).toHaveBeenCalledWith(appActions.updateApp())
})
