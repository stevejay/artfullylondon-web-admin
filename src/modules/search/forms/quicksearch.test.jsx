import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import * as browserConstants from '_src/constants/browser'
import { QuicksearchForm } from './quicksearch'

it('should render correctly', () => {
  const wrapper = shallow(
    <QuicksearchForm
      initialValues={{}}
      submitting={false}
      handleSubmit={_.noop}
      onSubmit={_.noop}
      onAutocompleteSearch={_.noop}
      onAutocompleteSelect={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should not submit on a key press that is not a return key press', () => {
  const handleSubmit = jest.fn()

  const wrapper = shallow(
    <QuicksearchForm
      initialValues={{}}
      submitting={false}
      handleSubmit={handleSubmit}
      onSubmit={_.noop}
      onAutocompleteSearch={_.noop}
      onAutocompleteSelect={_.noop}
    />
  )

  wrapper.find('Form').prop('onKeyPress')({
    charCode: 1234,
    preventDefault: _.noop
  })

  expect(handleSubmit).not.toHaveBeenCalled()
})

it('should submit on a return key press', () => {
  const handleSubmit = jest.fn()

  const wrapper = shallow(
    <QuicksearchForm
      initialValues={{}}
      submitting={false}
      handleSubmit={handleSubmit}
      onSubmit={_.noop}
      onAutocompleteSearch={_.noop}
      onAutocompleteSelect={_.noop}
    />
  )

  wrapper.find('Form').prop('onKeyPress')({
    charCode: browserConstants.ENTER_CHARCODE,
    preventDefault: _.noop
  })

  expect(handleSubmit).toHaveBeenCalled()
})
