import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import Bars from 'react-icons/lib/fa/bars'
import Search from 'react-icons/lib/fa/search'
import IconButton from '_src/components/button/icon'
import HeaderContainer from '_src/components/header/container'
import HeaderLogo from '_src/components/header/logo'
import HeaderMenuBar from '_src/components/header/menu-bar'
import HeaderMenu from '_src/components/header/menu'
import HeaderLink from '_src/components/header/link'
import HeaderButton from '_src/components/header/button'
import {
  ALLOWED_BROWSER_WIDTH_TYPES,
  BROWSER_WIDTH_TYPE_WIDE
} from '_src/constants/browser'
import menus from '_src/constants/menus'
import { showSidenav, showQuicksearch } from '_src/actions/modal'
import { AUTH_STATE_LOGGED_IN } from '_src/constants/auth'

export class Header extends React.Component {
  shouldComponentUpdate (nextProps) {
    return (
      nextProps.loggedIn !== this.props.loggedIn ||
      nextProps.browserWidthType !== this.props.browserWidthType ||
      nextProps.showingSidenav !== this.props.showingSidenav
    )
  }
  render () {
    const {
      showSidenav,
      showQuicksearch,
      loggedIn,
      browserWidthType,
      showingSidenav,
      history
    } = this.props

    const isWideBrowser = browserWidthType === BROWSER_WIDTH_TYPE_WIDE

    // TODO better solution:
    const filteredMenus = menus.filter(
      menu => (loggedIn ? menu.showWhenLoggedIn : menu.showWhenLoggedOut)
    )

    return (
      <HeaderContainer>
        <HeaderLogo size={isWideBrowser ? 'medium' : 'small'} />
        <HeaderMenuBar>
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
            filteredMenus.map(menu => (
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
      </HeaderContainer>
    )
  }
}

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  browserWidthType: PropTypes.oneOf(ALLOWED_BROWSER_WIDTH_TYPES).isRequired,
  showingSidenav: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  showSidenav: PropTypes.func.isRequired,
  showQuicksearch: PropTypes.func.isRequired
}

export default withRouter(
  connect(
    state => ({
      loggedIn: state.auth.state === AUTH_STATE_LOGGED_IN,
      browserWidthType: state.browser.widthType,
      showingSidenav: state.modal.showSidenav
    }),
    dispatch => ({
      showSidenav: bindActionCreators(showSidenav, dispatch),
      showQuicksearch: bindActionCreators(showQuicksearch, dispatch)
    })
  )(Header)
)
