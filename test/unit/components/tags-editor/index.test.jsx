import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import TagsEditor from '_src/components/tags-editor'

it('should render correctly', () => {
  const wrapper = shallow(
    <TagsEditor
      value={[{ label: 'Some Label', id: 'some-id' }]}
      tagType='medium'
      deleteInProgress={false}
      constraint={{}}
      formComponent={() => 'div'}
      onDelete={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
