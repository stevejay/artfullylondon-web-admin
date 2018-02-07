import React from 'react'
import PropTypes from 'prop-types'
import { Modal as ReactOverlaysModal } from 'react-overlays'
import Transition from './transition'
import './index.scss'

class Modal extends React.Component {
  shouldComponentUpdate (nextProps) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.modalProps !== this.props.modalProps ||
      nextProps.component !== this.props.component ||
      nextProps.componentProps !== this.props.componentProps
    )
  }
  handleHide = () => {
    const { onHide, modalProps } = this.props

    if (modalProps && modalProps.notDismissable) {
      return
    }

    onHide({ name: modalProps ? modalProps.name : null })
  }
  render () {
    const { show, component, componentProps } = this.props

    return (
      <ReactOverlaysModal
        aria-label='Modal dialog'
        styleName='modal'
        backdropClassName='backdrop'
        show={show}
        onHide={this.handleHide}
        transition={Transition}
        backdropTransitionTimeout={250}
        dialogTransitionTimeout={250}
        timeout={300}
      >
        <div styleName='content'>
          {!!component &&
            React.createElement(component, {
              ...componentProps,
              onHide: this.handleHide
            })}
        </div>
      </ReactOverlaysModal>
    )
  }
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  modalProps: PropTypes.shape({
    notDismissable: PropTypes.bool,
    name: PropTypes.string
  }),
  component: PropTypes.any,
  componentProps: PropTypes.object,
  onHide: PropTypes.func
}

export default Modal
