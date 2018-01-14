import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import Bars from 'react-icons/lib/fa/bars'
import Search from 'react-icons/lib/fa/search'

import IconButton from '_src/components/button/icon'
import HeaderLogo from '_src/components/logo/header'
import HeaderMenuBar from '_src/modules/header/components/menu-bar'
import HeaderMenu from '_src/modules/header/components/menu'
import HeaderLink from '_src/modules/header/components/link'
import HeaderButton from '_src/modules/header/components/button'
import * as authSelectors from '_src/store/selectors/auth'
import * as browserSelectors from '_src/store/selectors/browser'
import * as menuConstants from '_src/constants/menu'
import * as modalActions from '_src/actions/modal'
import './index.scss'

export class Header extends React.Component {
  shouldComponentUpdate (nextProps) {
    return (
      nextProps.loggedIn !== this.props.loggedIn ||
      nextProps.isWideBrowser !== this.props.isWideBrowser ||
      nextProps.showingSidenav !== this.props.showingSidenav
    )
  }
  render () {
    const {
      showSidenav,
      showQuicksearch,
      loggedIn,
      isWideBrowser,
      showingSidenav,
      history
    } = this.props

    const menus = loggedIn
      ? menuConstants.LOGGED_IN_MENUS
      : menuConstants.LOGGED_OUT_MENUS

    return [
      <HeaderLogo
        key='logo'
        styleName='logo'
        size={isWideBrowser ? 'medium' : 'small'}
      />,
      <HeaderMenuBar key='menu'>
        {!isWideBrowser &&
          loggedIn &&
          <IconButton
            icon={Search}
            onClick={showQuicksearch}
            ariaLabel='Show quicksearch dialog'
            style={{ marginRight: '1.5rem' }}
          />}
        {!isWideBrowser &&
          <IconButton
            icon={Bars}
            onClick={showSidenav}
            aria-label='Show navigation menu'
            aria-controls='sidenav'
            ariaExpanded={showingSidenav}
          />}
        {isWideBrowser &&
          menus.map(menu => (
            <HeaderMenu
              key={menu.label}
              label={menu.label}
              items={menu.items}
              history={history}
            />
          ))}
        {isWideBrowser &&
          <HeaderLink
            label={loggedIn ? 'Log Out' : 'Log In'}
            to={loggedIn ? '/log-out' : '/log-in'}
          />}
        {isWideBrowser &&
          loggedIn &&
          <HeaderButton
            label='Quicksearch'
            onClick={showQuicksearch}
            aria-label='Show quicksearch dialog'
          />}
      </HeaderMenuBar>
    ]
  }
}

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  isWideBrowser: PropTypes.bool.isRequired,
  showingSidenav: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  showSidenav: PropTypes.func.isRequired,
  showQuicksearch: PropTypes.func.isRequired
}

export default withRouter(
  connect(
    state => ({
      loggedIn: authSelectors.isLoggedIn(state),
      isWideBrowser: browserSelectors.isWideBrowser(state),
      showingSidenav: state.modal.showSidenav
    }),
    dispatch => ({
      showSidenav: bindActionCreators(modalActions.showSidenav, dispatch),
      showQuicksearch: bindActionCreators(
        modalActions.showQuicksearch,
        dispatch
      )
    })
  )(Header)
)
