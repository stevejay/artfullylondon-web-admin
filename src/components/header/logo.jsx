import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Logo from '_src/components/logo'
import './logo.m.scss'

class HeaderLogo extends React.Component {
  shouldComponentUpdate (nextProps) {
    return nextProps.size !== this.props.size
  }
  render () {
    const { size, onClick, ...rest } = this.props

    return (
      <Link
        {...rest}
        to='/'
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
  onClick: PropTypes.func
}

export default HeaderLogo
