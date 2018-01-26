import React from 'react'
import PropTypes from 'prop-types'

import FieldContainer from '_src/components/field/container'
import FieldBorder from '_src/components/field/border'
import FieldDivider from '_src/components/field/divider'
import { EDITABLE_ENTITY_TYPES } from '_src/constants/entity'
import ImageGrid from '_src/components/image-grid'
import ImageGridCard from '_src/components/image-grid/card'
// import ImageEditorForm from '_src/containers/forms/image-editor'
// import UpdateImageModal from '_src/containers/modals/update-image'

// import { addImageConstraint } from '_src/constants/image-constraints'

class ImagesField extends React.Component {
  handleSubmit = values => {
    const {
      input: { value },
      entityType,
      parentFormName,
      imageActions
    } = this.props

    imageActions.addImage({
      values,
      entityType,
      isMain: value.length === 0,
      parentFormName
    })
  }
  handleSetMainImage = key => {
    const { parentFormName, imageActions } = this.props
    imageActions.setMainImage({ id: key, parentFormName })
  }
  handleDeleteImage = key => {
    const { parentFormName, imageActions } = this.props
    imageActions.deleteImage({ id: key, parentFormName })
  }
  handleUpdateImage = ({ key, copyright }) => {
    // const { showModal, imageActions, parentFormName } = this.props
    // showModal({
    //   component: UpdateImageModal,
    //   componentProps: {
    //     formData: { copyright },
    //     onSubmit: values =>
    //       imageActions.updateImage({
    //         id: key,
    //         values,
    //         parentFormName
    //       })
    //   }
    // })
  }
  render () {
    const {
      label,
      entityType,
      input: { value },
      meta: { touched, error }
    } = this.props

    // TODO add form and modal back in

    return (
      <FieldContainer
        label={label}
        htmlFor={label}
        error={error}
        touched={touched}
      >
        <FieldBorder>
          {/* <ImageEditorForm
            ref={ref => (this._form = ref)}
            onSubmit={this.handleSubmit}
            constraint={addImageConstraint}
          /> */}
          <FieldDivider />
          <ImageGrid>
            {value.map(element => (
              <ImageGridCard
                key={element.id}
                value={element}
                entityType={entityType}
                onDelete={this.handleDeleteImage}
                onUpdateCopyright={this.handleUpdateImage}
                onSetMain={this.handleSetMainImage}
              />
            ))}
          </ImageGrid>
        </FieldBorder>
      </FieldContainer>
    )
  }
}

ImagesField.propTypes = {
  label: PropTypes.string.isRequired,
  entityType: PropTypes.oneOf(EDITABLE_ENTITY_TYPES).isRequired,
  input: PropTypes.shape({
    value: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        isMain: PropTypes.bool.isRequired
      })
    ).isRequired,
    onChange: PropTypes.func.isRequired
  }),
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.any
  }),
  parentFormName: PropTypes.string.isRequired,
  imageActions: PropTypes.shape({
    addImage: PropTypes.func.isRequired,
    setMainImage: PropTypes.func.isRequired,
    deleteImage: PropTypes.func.isRequired,
    updateImage: PropTypes.func.isRequired
  }).isRequired,
  showModal: PropTypes.func.isRequired
}

export default ImagesField
