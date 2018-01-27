import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import FieldContainer from '_src/components/field/container'
import FieldBorder from '_src/components/field/border'
import FieldDivider from '_src/components/field/divider'
import ImageGrid from '_src/components/image-grid'
import ImageGridCard from '_src/components/image-grid/card'
import ImagesEditorForm from '_src/components/images/editor-form'
// import UpdateImageModal from '_src/containers/modals/update-image'
import * as entityConstants from '_src/constants/entity'

class ImagesField extends React.Component {
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
  handleAddImage = values => {
    this.props.onAddImage({
      values,
      isMain: !_.isEmpty(this.props.input.value)
    })
  }
  render () {
    const {
      label,
      entityType,
      input: { value },
      meta: { touched, error },
      onSetMainImage,
      onDeleteImage
    } = this.props

    // TODO add modal back in

    return (
      <FieldContainer
        label={label}
        htmlFor={label}
        error={error}
        touched={touched}
      >
        <FieldBorder>
          <ImagesEditorForm onSubmit={this.handleAddImage} />
          <FieldDivider />
          <ImageGrid>
            {value.map(element => (
              <ImageGridCard
                key={element.id}
                value={element}
                entityType={entityType}
                onDelete={onDeleteImage}
                onUpdateCopyright={this.handleUpdateImage}
                onSetMain={onSetMainImage}
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
  entityType: PropTypes.oneOf(entityConstants.EDITABLE_ENTITY_TYPES).isRequired,
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
  showModal: PropTypes.func.isRequired,
  onAddImage: PropTypes.func.isRequired,
  onSetMainImage: PropTypes.func.isRequired,
  onDeleteImage: PropTypes.func.isRequired
}

export default ImagesField
