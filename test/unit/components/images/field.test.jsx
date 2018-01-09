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
      imageActions={{
        addImage: _.noop,
        setMainImage: _.noop,
        deleteImage: _.noop,
        updateImage: _.noop
      }}
      showModal={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
