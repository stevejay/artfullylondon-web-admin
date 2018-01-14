import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import HeaderLogo from '_src/components/logo/header'
import SidenavModal from '_src/components/sidenav/modal'
import SidebarButton from '_src/components/sidenav/button'
import Menu from '_src/components/sidenav/menu'
import * as menuConstants from '_src/constants/menu'
import { AUTH_STATE_LOGGED_IN } from '_src/constants/auth'
import { hideSidenav } from '_src/actions/modal'

export class Sidenav extends React.Component {
  constructor (props) {
    super(props)
    this.state = { idOfOpenMenu: null }
  }
  shouldComponentUpdate (nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.pathname !== this.props.pathname ||
      nextProps.loggedIn !== this.props.loggedIn ||
      nextState.idOfOpenMenu !== this.state.idOfOpenMenu
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
  handleLogIn = () => {
    this.props.onHide()
    this.props.history.push('/log-in')
  }
  handleLogOut = () => {
    this.props.onHide()
    this.props.history.push('/log-out')
  }
  render () {
    const { show, loggedIn, onHide } = this.props

    const menus = loggedIn
      ? menuConstants.LOGGED_IN_MENUS
      : menuConstants.LOGGED_OUT_MENUS

    return (
      <SidenavModal show={show} onHide={onHide}>
        <HeaderLogo size='small' onClick={this.handleLinkClick} />
        {menus.map(menu => (
          <Menu
            key={menu.label}
            id={menu.label}
            label={menu.label}
            onExpanderChange={this.handleHeaderClick}
            onLinkClick={this.handleLinkClick}
            items={menu.items}
            idOfOpenMenu={this.state.idOfOpenMenu}
          />
        ))}
        {loggedIn &&
          <SidebarButton label='Log Out' onClick={this.handleLogOut} />}
        {!loggedIn &&
          <SidebarButton
            label='Log In / Register'
            onClick={this.handleLogIn}
          />}
      </SidenavModal>
    )
  }
}

Sidenav.propTypes = {
  show: PropTypes.bool.isRequired,
  pathname: PropTypes.string.isRequired, // TODO is this required?
  loggedIn: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

export default withRouter(
  connect(
    state => ({
      show: state.modal.showSidenav,
      loggedIn: state.auth.state === AUTH_STATE_LOGGED_IN
    }),
    dispatch => ({
      onHide: bindActionCreators(hideSidenav, dispatch)
    })
  )(Sidenav)
)
