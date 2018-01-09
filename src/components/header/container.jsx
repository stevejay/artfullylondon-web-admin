import React from 'react'
import PropTypes from 'prop-types'
import './container.m.scss'

const HeaderContainer = props => (
  <header className='nocontent' styleName='container' role='banner'>
    {props.children}
  </header>
)

HeaderContainer.propTypes = {
  children: PropTypes.any.isRequired
}

export default HeaderContainer
