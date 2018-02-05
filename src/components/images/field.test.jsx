import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import ImagesField from '_src/components/images/field'
import ImagesEditorForm from '_src/components/images/editor-form'
import ImageGridCard from '_src/components/image-grid/card'
import UpdateImageModal from '_src/components/images/update-image-modal'

it('should render correctly', () => {
  const wrapper = shallow(
    <ImagesField
      label='The Label'
      entityType='venue'
      input={{
        value: [{ key: 'some-key', id: 'some-id', isMain: true }],
        onChange: _.noop
      }}
      meta={{ touched: false, error: null }}
      parentFormName='TheParentFormName'
      onAddImage={_.noop}
      onSetMainImage={_.noop}
      onDeleteImage={_.noop}
      onUpdateImage={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should handle adding an image that should be marked as the main image', () => {
  const handleAddImage = jest.fn()

  const wrapper = shallow(
    <ImagesField
      label='The Label'
      entityType='venue'
      input={{ value: [], onChange: _.noop }}
      meta={{ touched: false, error: null }}
      parentFormName='TheParentFormName'
      onAddImage={handleAddImage}
      onSetMainImage={_.noop}
      onDeleteImage={_.noop}
      onUpdateImage={_.noop}
    />
  )

  wrapper.find(ImagesEditorForm).prop('onSubmit')({ url: 'http://some-url' })

  expect(handleAddImage).toHaveBeenCalledWith({
    values: { url: 'http://some-url' },
    isMain: true
  })
})

it('should handle adding an image that should be marked as the main image', () => {
  const handleAddImage = jest.fn()

  const wrapper = shallow(
    <ImagesField
      label='The Label'
      entityType='venue'
      input={{
        value: [{ key: 'some-key', id: 'some-id', isMain: true }],
        onChange: _.noop
      }}
      meta={{ touched: false, error: null }}
      parentFormName='TheParentFormName'
      onAddImage={handleAddImage}
      onSetMainImage={_.noop}
      onDeleteImage={_.noop}
      onUpdateImage={_.noop}
    />
  )

  wrapper.find(ImagesEditorForm).prop('onSubmit')({ url: 'http://some-url' })

  expect(handleAddImage).toHaveBeenCalledWith({
    values: { url: 'http://some-url' },
    isMain: false
  })
})

it('should handle editing an image', () => {
  const wrapper = shallow(
    <ImagesField
      label='The Label'
      entityType='venue'
      input={{
        value: [{ key: 'some-key', id: 'some-id', isMain: true }],
        onChange: _.noop
      }}
      meta={{ touched: false, error: null }}
      parentFormName='TheParentFormName'
      onAddImage={_.noop}
      onSetMainImage={_.noop}
      onDeleteImage={_.noop}
      onUpdateImage={_.noop}
    />
  )

  expect(wrapper.state()).toEqual({ showModal: false, initialValues: null })

  wrapper.find(ImageGridCard).prop('onUpdate')({ copyright: 'Copy' })

  expect(wrapper.state()).toEqual({
    showModal: true,
    initialValues: { copyright: 'Copy' }
  })
})

it('should handle hiding the edit image modal', () => {
  const wrapper = shallow(
    <ImagesField
      label='The Label'
      entityType='venue'
      input={{
        value: [{ key: 'some-key', id: 'some-id', isMain: true }],
        onChange: _.noop
      }}
      meta={{ touched: false, error: null }}
      parentFormName='TheParentFormName'
      onAddImage={_.noop}
      onSetMainImage={_.noop}
      onDeleteImage={_.noop}
      onUpdateImage={_.noop}
    />
  )

  wrapper.find(ImageGridCard).prop('onUpdate')({ copyright: 'Copy' })
  wrapper.find(UpdateImageModal).prop('onHide')()

  expect(wrapper.state()).toEqual({
    showModal: false,
    initialValues: null
  })
})

it('should handle submitting the edit image modal', () => {
  const handleUpdateImage = jest.fn().mockResolvedValue()

  const wrapper = shallow(
    <ImagesField
      label='The Label'
      entityType='venue'
      input={{
        value: [{ key: 'some-key', id: 'some-id', isMain: true }],
        onChange: _.noop
      }}
      meta={{ touched: false, error: null }}
      parentFormName='TheParentFormName'
      onAddImage={_.noop}
      onSetMainImage={_.noop}
      onDeleteImage={_.noop}
      onUpdateImage={handleUpdateImage}
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
      expect(handleUpdateImage).toHaveBeenCalledWith({
        values: { copyright: 'New copy' },
        id: 'some-id'
      })

      expect(wrapper.state()).toEqual({
        showModal: false,
        initialValues: null
      })
    })
})
