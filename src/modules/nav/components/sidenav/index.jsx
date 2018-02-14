import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import log from 'loglevel'

import Modal from '_src/components/modal'
import HeaderLogo from '_src/components/logo/header'
import SidenavButton from '_src/modules/nav/components/sidenav/button'
import ModalTransition
  from '_src/modules/nav/components/sidenav/modal-transition'
import Menu from '_src/modules/nav/components/sidenav/menu'
import { selectors, actions as userActions } from '_src/modules/user'
import * as navConstants from '_src/modules/nav/constants'
import './index.scss'

export class Sidenav extends React.Component {
  constructor (props) {
    super(props)
    this.state = { idOfOpenMenu: null, hasError: false }
  }
  shouldComponentUpdate (nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      // ensure sidenav updates on navigation:
      nextProps.pathname !== this.props.pathname ||
      nextProps.loggedIn !== this.props.loggedIn ||
      nextState.idOfOpenMenu !== this.state.idOfOpenMenu ||
      nextState.hasError !== this.state.hasError
    )
  }
  handleHeaderClick = id => {
    this.setState({
      idOfOpenMenu: this.state.idOfOpenMenu === id ? null : id
    })
  }
  handleLinkClick = () => {
    this.props.onHide()
  }
  handleLogOut = () => {
    this.props.onHide()
    this.props.dispatch(userActions.logOut())
  }
  componentDidCatch (error, info) {
    this.setState({ hasError: true })
    log.error(error, info.componentStack)
  }
  render () {
    const { show, loggedIn, onHide } = this.props
    const { hasError, idOfOpenMenu } = this.state

    if (!loggedIn || hasError) {
      return null
    }

    return (
      <Modal show={show} transition={ModalTransition} onHide={onHide}>
        <div styleName='modal' className='nocontent' role='navigation'>
          <HeaderLogo size='small' onClick={this.handleLinkClick} />
          {navConstants.MENUS.map(menu => (
            <Menu
              key={menu.label}
              id={menu.label}
              label={menu.label}
              onExpanderChange={this.handleHeaderClick}
              onLinkClick={this.handleLinkClick}
              items={menu.items}
              idOfOpenMenu={idOfOpenMenu}
            />
          ))}
          <SidenavButton onClick={this.handleLogOut}>Log out</SidenavButton>
        </div>
      </Modal>
    )
  }
}

Sidenav.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  show: PropTypes.bool.isRequired,
  pathname: PropTypes.string.isRequired,
  onHide: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default withRouter(
  connect(
    /* istanbul ignore next */
    state => ({ loggedIn: selectors.userIsLoggedIn(state) })
  )(Sidenav)
)