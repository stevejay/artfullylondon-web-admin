import React from 'react'
import PropTypes from 'prop-types'
import ModalContainer from '_src/components/modal/container'
import { ALLOWED_TAG_TYPES } from '_src/constants/tag'
import AddTagForm from '_src/containers/forms/add-tag'

class AddTagModal extends React.Component {
  handleSubmit = values => {
    this.props.onSubmit(values)
  }
  render () {
    const { tagType, title } = this.props

    return (
      <ModalContainer title={title} type='narrow' onHide={this.props.onHide}>
        <AddTagForm
          onSubmit={this.handleSubmit}
          tagType={tagType}
          addTagForEvent
        />
      </ModalContainer>
    )
  }
}

AddTagModal.namepropTypes = {
  onHide: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  tagType: PropTypes.oneOf(ALLOWED_TAG_TYPES).isRequired,
  title: PropTypes.string.isRequired
}

export default AddTagModal
