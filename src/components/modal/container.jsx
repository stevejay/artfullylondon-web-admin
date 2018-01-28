import React from 'react'
import PropTypes from 'prop-types'
import Close from 'react-icons/lib/fa/close'
import IconButton from '_src/components/button/icon'
import './Container.scss'

const ModalContainer = ({
  type,
  title,
  dismissable,
  className,
  children,
  onHide,
  ...rest
}) => (
  <div {...rest} styleName={'container-' + type} className={className}>
    <h1 styleName='header'>{title}</h1>
    {dismissable &&
      <IconButton
        type='inverse'
        icon={Close}
        onClick={onHide}
        styleName='close'
        aria-label='Close modal dialog'
      />}
    {children}
  </div>
)

ModalContainer.propTypes = {
  type: PropTypes.oneOf(['narrow', 'wide']).isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  dismissable: PropTypes.bool.isRequired,
  className: PropTypes.string,
  onHide: PropTypes.func.isRequired
}

ModalContainer.defaultProps = {
  type: 'narrow',
  dismissable: true
}

export default ModalContainer
