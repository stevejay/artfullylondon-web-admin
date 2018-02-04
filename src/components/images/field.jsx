import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import UpdateImageModal from '_src/components/images/update-image-modal'
import FieldContainer from '_src/components/field/container'
import FieldBorder from '_src/components/field/border'
import FieldDivider from '_src/components/field/divider'
import ImageGrid from '_src/components/image-grid'
import ImageGridCard from '_src/components/image-grid/card'
import ImagesEditorForm from '_src/components/images/editor-form'
import * as entityConstants from '_src/constants/entity'

class ImagesField extends React.Component {
  constructor (props) {
    super(props)
    this.state = { showModal: false, initialValues: null }
    this.mounted = true
  }
  /* istanbul ignore next */
  componentWillUnmount () {
    this.mounted = false
  }
  handleAddImage = values => {
    this.props.onAddImage({
      values,
      isMain: _.isEmpty(this.props.input.value)
    })
  }
  handleUpdateImage = initialValues => {
    this.setState({ showModal: true, initialValues })
  }
  handleSubmitModal = values => {
    return this.props
      .onUpdateImage({
        // TODO change this?
        values: { copyright: values.copyright },
        id: values.id
      })
      .then(() => {
        this.mounted && this.handleHideModal()
      })
  }
  handleHideModal = () => {
    this.setState({ showModal: false, initialValues: null })
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

    const { showModal, initialValues } = this.state

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
                onUpdate={this.handleUpdateImage}
                onSetMain={onSetMainImage}
              />
            ))}
          </ImageGrid>
        </FieldBorder>
        <UpdateImageModal
          show={showModal}
          initialValues={initialValues}
          onSubmit={this.handleSubmitModal}
          onHide={this.handleHideModal}
        />
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
  onAddImage: PropTypes.func.isRequired,
  onUpdateImage: PropTypes.func.isRequired,
  onSetMainImage: PropTypes.func.isRequired,
  onDeleteImage: PropTypes.func.isRequired
}

export default ImagesField
