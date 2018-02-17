import React from 'react'
import _ from 'lodash'

import { ImagesField } from './images-field'
import ImageGridCard from './image-grid-card'
import UpdateImageModal from './update-image-modal'
import AddImageForm from '../forms/add-image-form'
import * as imageActions from '../actions'

it('should render correctly when not showign the update image modal', () => {
  const wrapper = shallow(
    <ImagesField
      label='The Label'
      parentFormName='ParentFormName'
      entityType='venue'
      input={{
        value: [{ key: 'some-key', id: 'some-id', isMain: true }],
        onChange: _.noop
      }}
      meta={{ touched: false, error: null }}
      initialValues={null}
      setInitialValues={_.noop}
      dispatch={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when showing the update image modal', () => {
  const wrapper = shallow(
    <ImagesField
      label='The Label'
      parentFormName='ParentFormName'
      entityType='venue'
      input={{
        value: [{ key: 'some-key', id: 'some-id', isMain: true }],
        onChange: _.noop
      }}
      meta={{ touched: false, error: null }}
      initialValues={{ copyright: 'foo', id: 'some-id' }}
      setInitialValues={_.noop}
      dispatch={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should handle adding an image that should be marked as the main image', () => {
  const dispatch = jest.fn()

  const wrapper = shallow(
    <ImagesField
      label='The Label'
      parentFormName='ParentFormName'
      entityType='venue'
      input={{ value: [], onChange: _.noop }}
      meta={{ touched: false, error: null }}
      initialValues={null}
      setInitialValues={_.noop}
      dispatch={dispatch}
    />
  )

  wrapper.find(AddImageForm).prop('onSubmit')({ url: 'http://some-url' })

  expect(dispatch).toHaveBeenCalledWith(
    imageActions.addImage(
      {
        values: { url: 'http://some-url' },
        isMain: true
      },
      'venue',
      'ParentFormName'
    )
  )
})

it('should handle adding an image that should not be marked as the main image', () => {
  const dispatch = jest.fn()

  const wrapper = shallow(
    <ImagesField
      label='The Label'
      parentFormName='ParentFormName'
      entityType='venue'
      input={{
        value: [{ key: 'some-key', id: 'some-id', isMain: true }],
        onChange: _.noop
      }}
      meta={{ touched: false, error: null }}
      initialValues={null}
      setInitialValues={_.noop}
      dispatch={dispatch}
    />
  )

  wrapper.find(AddImageForm).prop('onSubmit')({ url: 'http://some-url' })

  expect(dispatch).toHaveBeenCalledWith(
    imageActions.addImage(
      {
        values: { url: 'http://some-url' },
        isMain: false
      },
      'venue',
      'ParentFormName'
    )
  )
})

it('should handle showing the edit image modal', () => {
  const setInitialValues = jest.fn()

  const wrapper = shallow(
    <ImagesField
      label='The Label'
      parentFormName='ParentFormName'
      entityType='venue'
      input={{
        value: [{ key: 'some-key', id: 'some-id', isMain: true }],
        onChange: _.noop
      }}
      meta={{ touched: false, error: null }}
      initialValues={null}
      setInitialValues={setInitialValues}
      dispatch={_.noop}
    />
  )

  wrapper.find(ImageGridCard).prop('onUpdate')({ copyright: 'Copy' })

  expect(setInitialValues).toHaveBeenCalledWith({
    copyright: 'Copy'
  })
})

it('should handle hiding the edit image modal', () => {
  const setInitialValues = jest.fn()

  const wrapper = shallow(
    <ImagesField
      label='The Label'
      parentFormName='ParentFormName'
      entityType='venue'
      input={{
        value: [{ key: 'some-key', id: 'some-id', isMain: true }],
        onChange: _.noop
      }}
      meta={{ touched: false, error: null }}
      initialValues={null}
      setInitialValues={setInitialValues}
      dispatch={_.noop}
    />
  )

  wrapper.find(ImageGridCard).prop('onUpdate')({ copyright: 'Copy' })
  wrapper.find(UpdateImageModal).prop('onHide')()

  expect(setInitialValues).toHaveBeenCalledWith(null)
})

it('should handle updating an image', () => {
  const dispatch = jest.fn().mockReturnValue(Promise.resolve())
  const setInitialValues = jest.fn()

  const wrapper = shallow(
    <ImagesField
      label='The Label'
      parentFormName='ParentFormName'
      entityType='venue'
      input={{
        value: [{ key: 'some-key', id: 'some-id', isMain: true }],
        onChange: _.noop
      }}
      meta={{ touched: false, error: null }}
      initialValues={null}
      setInitialValues={setInitialValues}
      dispatch={dispatch}
    />
  )

  wrapper.find(ImageGridCard).prop('onUpdate')({ copyright: 'Copy' })

  return wrapper
    .find(UpdateImageModal)
    .prop('onSubmit')({
      copyright: 'New copy',
      id: 'some-id'
    })
    .then(() => {
      expect(dispatch).toHaveBeenCalledWith(
        imageActions.updateImage(
          { copyright: 'New copy' },
          'some-id',
          'ParentFormName'
        )
      )

      expect(setInitialValues).toHaveBeenCalledWith(null)
    })
})

it('should handle deleting an image', () => {
  const dispatch = jest.fn()

  const wrapper = shallow(
    <ImagesField
      label='The Label'
      parentFormName='ParentFormName'
      entityType='venue'
      input={{
        value: [{ key: 'some-key', id: 'some-id', isMain: true }],
        onChange: _.noop
      }}
      meta={{ touched: false, error: null }}
      initialValues={null}
      setInitialValues={_.noop}
      dispatch={dispatch}
    />
  )

  wrapper.find(ImageGridCard).prop('onDelete')('some-id')

  expect(dispatch).toHaveBeenCalledWith(
    imageActions.deleteImage('some-id', 'ParentFormName')
  )
})

it('should handle setting an image as main', () => {
  const dispatch = jest.fn()

  const wrapper = shallow(
    <ImagesField
      label='The Label'
      parentFormName='ParentFormName'
      entityType='venue'
      input={{
        value: [{ key: 'some-key', id: 'some-id', isMain: true }],
        onChange: _.noop
      }}
      meta={{ touched: false, error: null }}
      initialValues={null}
      setInitialValues={_.noop}
      dispatch={dispatch}
    />
  )

  wrapper.find(ImageGridCard).prop('onSetMain')('some-id')

  expect(dispatch).toHaveBeenCalledWith(
    imageActions.setMainImage('some-id', 'ParentFormName')
  )
})
