import React from 'react'
import _ from 'lodash'
import { arrayPush } from 'redux-form'

import { EditEventTagsForm } from './tags'
import TagSelector from '../components/tag-selector'
import tagType from '_src/domain/types/tag-type'
import * as eventConstants from '../constants'
import { actions as tagActions } from '_src/modules/tag'

it('should render correctly when creating', () => {
  const wrapper = shallow(
    <EditEventTagsForm
      initialValues={{ name: 'The Name' }}
      isEdit={false}
      submitting={false}
      styleTags={[{ id: 'style/comedy', label: 'comedy' }]}
      audienceTags={[{ id: 'audience/family', label: 'family' }]}
      geoTags={[{ id: 'geo/usa', label: 'usa' }]}
      mediumTags={[{ id: 'medium/sculpture', label: 'sculpture' }]}
      handleSubmit={func => func}
      onSubmit={_.noop}
      onCancel={_.noop}
      onPreviousPage={_.noop}
      dispatch={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when editing', () => {
  const wrapper = shallow(
    <EditEventTagsForm
      initialValues={{ name: 'The Name' }}
      isEdit
      submitting={false}
      styleTags={[{ id: 'style/comedy', label: 'comedy' }]}
      audienceTags={[{ id: 'audience/family', label: 'family' }]}
      geoTags={[{ id: 'geo/usa', label: 'usa' }]}
      mediumTags={[{ id: 'medium/sculpture', label: 'sculpture' }]}
      handleSubmit={func => func}
      onSubmit={_.noop}
      onCancel={_.noop}
      onPreviousPage={_.noop}
      dispatch={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should handle an add tag event', () => {
  const dispatch = jest.fn().mockReturnValueOnce(
    Promise.resolve({
      id: 'server-tag'
    })
  )

  const wrapper = shallow(
    <EditEventTagsForm
      initialValues={{ name: 'The Name' }}
      isEdit={false}
      submitting={false}
      styleTags={[{ id: 'style/comedy', label: 'comedy' }]}
      audienceTags={[{ id: 'audience/family', label: 'family' }]}
      geoTags={[{ id: 'geo/usa', label: 'usa' }]}
      mediumTags={[{ id: 'medium/sculpture', label: 'sculpture' }]}
      handleSubmit={func => func}
      onSubmit={_.noop}
      onCancel={_.noop}
      onPreviousPage={_.noop}
      dispatch={dispatch}
    />
  )

  return wrapper
    .find(TagSelector)
    .at(0)
    .prop('onAddTag')({ tagType: tagType.MEDIUM })
    .then(() => {
      expect(dispatch).toHaveBeenCalledWith(
        tagActions.addTag({ tagType: tagType.MEDIUM })
      )

      expect(dispatch).toHaveBeenCalledWith(
        arrayPush(eventConstants.EDIT_EVENT_TAGS_FORM_NAME, 'mediumTags', {
          id: 'server-tag'
        })
      )
    })
})
