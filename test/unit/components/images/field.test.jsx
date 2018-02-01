import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import ImagesField from '_src/components/images/field'

it('should render correctly', () => {
  const wrapper = shallow(
    <ImagesField
      label='The Label'
      entityType='venue'
      input={{
        value: [
          {
            key: 'some-key',
            id: 'some-id',
            isMain: true
          }
        ],
        onChange: _.noop
      }}
      meta={{
        touched: false,
        error: null
      }}
      parentFormName='TheParentFormName'
      onAddImage={_.noop}
      onSetMainImage={_.noop}
      onDeleteImage={_.noop}
      onUpdateImage={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
