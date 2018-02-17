import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withState } from 'recompose'
import _ from 'lodash'

import * as entityConstants from '_src/constants/entity'
import FieldContainer from '_src/components/field/container'
import FieldBorder from '_src/components/field/border'
import FieldDivider from '_src/components/field/divider'
import UpdateImageModal from './update-image-modal'
import ImageGrid from './image-grid'
import ImageGridCard from './image-grid-card'
import AddImageForm from '../forms/add-image-form'
import * as imageActions from '../actions'

export class ImagesField extends React.Component {
  shouldComponentUpdate (nextProps) {
    return (
      nextProps.input.value !== this.props.input.value ||
      nextProps.meta.touched !== this.props.meta.touched ||
      nextProps.meta.error !== this.props.meta.error ||
      nextProps.initialValues !== this.props.initialValues
    )
  }
  handleShowModal = initialValues => {
    this.props.setInitialValues(initialValues)
  }
  handleHideModal = () => {
    this.props.setInitialValues(null)
  }
  handleAddImage = values => {
    const { dispatch, entityType, parentFormName, input } = this.props

    dispatch(
      imageActions.addImage(
        {
          values,
          isMain: _.isEmpty(input.value)
        },
        entityType,
        parentFormName
      )
    )
  }
  handleSubmitUpdate = values => {
    const { dispatch, parentFormName } = this.props

    return dispatch(
      imageActions.updateImage(
        { copyright: values.copyright },
        values.id,
        parentFormName
      )
    ).then(this.handleHideModal)
  }
  handleSetMainImage = id => {
    this.props.dispatch(
      imageActions.setMainImage(id, this.props.parentFormName)
    )
  }
  handleDeleteImage = id => {
    this.props.dispatch(imageActions.deleteImage(id, this.props.parentFormName))
  }
  render () {
    const {
      label,
      entityType,
      input: { value },
      meta: { touched, error },
      initialValues
    } = this.props

    return (
      <FieldContainer
        label={label}
        htmlFor={label}
        error={error}
        touched={touched}
      >
        <FieldBorder>
          <AddImageForm onSubmit={this.handleAddImage} />
          <FieldDivider />
          <ImageGrid>
            {value.map(element => (
              <ImageGridCard
                key={element.id}
                value={element}
                entityType={entityType}
                onDelete={this.handleDeleteImage}
                onUpdate={this.handleShowModal}
                onSetMain={this.handleSetMainImage}
              />
            ))}
          </ImageGrid>
        </FieldBorder>
        <UpdateImageModal
          show={!!initialValues}
          initialValues={initialValues}
          onSubmit={this.handleSubmitUpdate}
          onHide={this.handleHideModal}
        />
      </FieldContainer>
    )
  }
}

ImagesField.propTypes = {
  label: PropTypes.string.isRequired,
  parentFormName: PropTypes.string.isRequired,
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
  initialValues: PropTypes.object,
  setInitialValues: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect()(
  withState('initialValues', 'setInitialValues', null)(ImagesField)
)
