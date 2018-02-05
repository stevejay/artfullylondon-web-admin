import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Bars from 'react-icons/lib/fa/bars'
import Search from 'react-icons/lib/fa/search'
import { withState } from 'recompose'
import log from 'loglevel'

import Button from '_src/components/button'
import IconButton from '_src/components/button/icon'
import HeaderLogo from '_src/components/logo/header'
import Toolbar from '_src/components/toolbar'
import ToolbarItem from '_src/components/toolbar/item'
import Dropdown from '_src/components/dropdown'
import { selectors, authActions } from '_src/store'
import * as menuConstants from '_src/constants/menu'
import './index.scss'

export class Header extends React.Component {
  shouldComponentUpdate (nextProps) {
    return (
      nextProps.loggedIn !== this.props.loggedIn ||
      nextProps.isWideBrowser !== this.props.isWideBrowser ||
      nextProps.showingSidenav !== this.props.showingSidenav ||
      nextProps.hasError !== this.props.hasError
    )
  }
  componentDidCatch (error, info) {
    this.props.setHasError(true)
    log.error(error, info.componentStack)
  }
  handleMenuItemSelected = value => {
    this.props.history.push(value)
  }
  handleLogout = () => {
    this.props.dispatch(authActions.logOut())
  }
  render () {
    const {
      onShowSidenav,
      onShowQuicksearch,
      loggedIn,
      isWideBrowser,
      showingSidenav,
      hasError
    } = this.props

    if (!loggedIn || hasError) {
      return null
    }

    return (
      <React.Fragment>
        <HeaderLogo
          styleName='logo'
          size={isWideBrowser ? 'medium' : 'small'}
        />
        <Toolbar>
          {isWideBrowser &&
            menuConstants.MENUS.map(menu => (
              <ToolbarItem key={menu.label} styleName='dropdown-toolbar-item'>
                <Dropdown
                  styleName='dropdown'
                  value={menu.label}
                  items={menu.items}
                  onChange={this.handleMenuItemSelected}
                />
              </ToolbarItem>
            ))}
          {isWideBrowser &&
            <ToolbarItem>
              <Button
                onClick={this.handleLogout}
                aria-label='Log out of the app'
              >
                Log Out
              </Button>
            </ToolbarItem>}
          <ToolbarItem>
            <IconButton
              icon={Search}
              onClick={onShowQuicksearch}
              aria-label='Show quicksearch dialog'
            />
          </ToolbarItem>
          {!isWideBrowser &&
            <ToolbarItem>
              <IconButton
                icon={Bars}
                onClick={onShowSidenav}
                aria-label='Show navigation menu'
                aria-controls='sidenav'
                ariaExpanded={showingSidenav}
              />
            </ToolbarItem>}
        </Toolbar>
      </React.Fragment>
    )
  }
}

Header.propTypes = {
  hasError: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  isWideBrowser: PropTypes.bool.isRequired,
  showingSidenav: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  onShowSidenav: PropTypes.func.isRequired,
  onShowQuicksearch: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  setHasError: PropTypes.func.isRequired
}

export default withRouter(
  connect(
    /* istanbul ignore next */
    state => ({
      loggedIn: selectors.userIsLoggedIn(state),
      isWideBrowser: selectors.isWideBrowser(state)
    })
  )(withState('hasError', 'setHasError', false)(Header))
)
