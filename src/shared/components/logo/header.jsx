import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Logo from '_src/shared/components/logo'
import './header.scss'

class HeaderLogo extends React.Component {
  shouldComponentUpdate (nextProps) {
    return nextProps.size !== this.props.size
  }
  render () {
    const { size, className, onClick } = this.props

    return (
      <Link
        to='/'
        className={className}
        styleName='logo'
        onClick={onClick}
        aria-label='Go to home page'
      >
        <Logo size={size} />
      </Link>
    )
  }
}

HeaderLogo.propTypes = {
  size: PropTypes.oneOf(['small', 'medium']),
  className: PropTypes.string,
  onClick: PropTypes.func
}

export default HeaderLogo
