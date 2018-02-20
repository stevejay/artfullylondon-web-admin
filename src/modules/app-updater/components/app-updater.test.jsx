import React from 'react'
import _ from 'lodash'

import { AppUpdater } from './app-updater'
import * as appUpdaterActions from '../actions'
import Button from '_src/shared/components/button'

it('should trigger app update state checks on construction', () => {
  const dispatch = jest.fn().mockReturnValue(Promise.resolve())

  shallow(
    <AppUpdater
      shouldUpdate={false}
      setShouldUpdate={_.noop}
      dispatch={dispatch}
    />
  )

  expect(dispatch).toHaveBeenCalledWith(
    appUpdaterActions.checkIfAppWasUpdated()
  )

  expect(dispatch).toHaveBeenCalledWith(
    appUpdaterActions.checkForNewAppVersion()
  )
})

it('should invoke the state updater when checkForNewAppVersion action returns', () => {
  const dispatch = jest.fn().mockReturnValue({ then: cb => cb() })
  const setShouldUpdate = jest.fn()

  shallow(
    <AppUpdater
      shouldUpdate={false}
      setShouldUpdate={setShouldUpdate}
      dispatch={dispatch}
    />
  )

  expect(setShouldUpdate).toHaveBeenCalledWith(true)
})

it('should render correctly when should not update', () => {
  const dispatch = jest.fn().mockReturnValue(Promise.resolve())

  const wrapper = shallow(
    <AppUpdater
      shouldUpdate={false}
      setShouldUpdate={_.noop}
      dispatch={dispatch}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when should update', () => {
  const dispatch = jest.fn().mockReturnValue(Promise.resolve())

  const wrapper = shallow(
    <AppUpdater shouldUpdate setShouldUpdate={_.noop} dispatch={dispatch} />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should invoke the update action when the update button is clicked', () => {
  const dispatch = jest.fn().mockReturnValue(Promise.resolve())

  const wrapper = shallow(
    <AppUpdater shouldUpdate setShouldUpdate={_.noop} dispatch={dispatch} />
  )

  wrapper.find(Button).simulate('click')

  expect(dispatch).toHaveBeenCalledWith(appUpdaterActions.updateApp())
})
