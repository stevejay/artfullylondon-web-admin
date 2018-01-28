import React from 'react'
import PropTypes from 'prop-types'
import Trash from 'react-icons/lib/fa/trash-o'
import Heart from 'react-icons/lib/fa/heart'
import Pencil from 'react-icons/lib/fa/pencil'

import UpdateImageModal from '_src/components/image-grid/update-image-modal'
import Image from '_src/components/image-grid/image'
import * as entityConstants from '_src/constants/entity'
import './card.scss'

class ImageGridCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = { showModal: false }
    this.mounted = true
  }
  shouldComponentUpdate (nextProps, nextState) {
    return (
      nextProps.value !== this.props.value ||
      nextState.showModal !== this.state.showModal
    )
  }
  componentWillUnmount () {
    this.mounted = false
  }
  handleDelete = event => {
    event.preventDefault()
    this.props.onDelete(this.props.value.key)
  }
  handleSetMain = event => {
    event.preventDefault()
    this.props.onSetMain(this.props.value.key)
  }
  handleEditImage = () => {
    this.setState({ showModal: true })
  }
  handleSubmitModal = values => {
    this.props
      .onUpdate({
        values: { copyright: values.copyright },
        id: this.props.value.id
      })
      .then(() => {
        this.mounted && this.handleHideModal()
      })
  }
  handleHideModal = () => {
    this.setState({ showModal: false })
  }
  render () {
    const {
      value,
      value: { id, copyright, ratio, isMain },
      entityType
    } = this.props

    const { showModal } = this.state

    return (
      <div styleName='card'>
        <Image imageId={id} type={entityType} ratio={ratio} size='very-small' />
        <div styleName='details-container'>
          {copyright
            ? <p><strong>©</strong> {copyright}</p>
            : <p styleName='no-copyright'>No Copyright String</p>}
          <div styleName='toolbar'>
            {isMain
              ? <Heart styleName='icon-main' />
              : <a styleName='link' onClick={this.handleSetMain}>
                <Heart styleName='icon' />
              </a>}
            <a styleName='link' onClick={this.handleDelete}>
              <Trash styleName='icon' />
            </a>
            <a styleName='link' onClick={this.handleEditImage}>
              <Pencil styleName='icon' />
            </a>
          </div>
        </div>
        <UpdateImageModal
          show={showModal}
          initialValues={value}
          onSubmit={this.handleSubmitModal}
          onHide={this.handleHideModal}
        />
      </div>
    )
  }
}

ImageGridCard.propTypes = {
  value: PropTypes.shape({
    key: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    isMain: PropTypes.bool.isRequired,
    copyright: PropTypes.string,
    ratio: PropTypes.number
  }).isRequired,
  entityType: PropTypes.oneOf(entityConstants.EDITABLE_ENTITY_TYPES).isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onSetMain: PropTypes.func.isRequired
}

export default ImageGridCard
