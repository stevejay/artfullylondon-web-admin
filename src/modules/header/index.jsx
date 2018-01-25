import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import Bars from 'react-icons/lib/fa/bars'
import Search from 'react-icons/lib/fa/search'
import log from 'loglevel'

import Button from '_src/components/button'
import IconButton from '_src/components/button/icon'
import HeaderLogo from '_src/components/logo/header'
import Toolbar from '_src/components/toolbar'
import ToolbarItem from '_src/components/toolbar/item'
// import Dropdown from '_src/modules/header/components/dropdown'
import Dropdown from '_src/components/dropdown'
import * as authActionTypes from '_src/constants/action/auth'
import * as authSelectors from '_src/store/selectors/auth'
import * as browserSelectors from '_src/store/selectors/browser'
import * as menuConstants from '_src/constants/menu'
import './index.scss'

export class Header extends React.Component {
  constructor (props) {
    super(props)
    this.state = { hasError: false }
  }
  shouldComponentUpdate (nextProps, nextState) {
    return (
      nextProps.loggedIn !== this.props.loggedIn ||
      nextProps.isWideBrowser !== this.props.isWideBrowser ||
      nextProps.showingSidenav !== this.props.showingSidenav ||
      nextState.hasError !== this.state.hasError
    )
  }
  componentDidCatch (error, info) {
    this.setState({ hasError: true })
    log.error(error, info.componentStack)
  }
  handleMenuItemSelected = item => {
    this.props.history.push(item.path)
  }
  handleLogout = () => {
    this.props.dispatch({ type: authActionTypes.LOG_OUT })
  }
  render () {
    const {
      onShowSidenav,
      onShowQuicksearch,
      loggedIn,
      isWideBrowser,
      showingSidenav,
      history
    } = this.props

    if (!loggedIn || this.state.hasError) {
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
                  label={menu.label}
                  items={menu.items}
                  onSelected={this.handleMenuItemSelected}
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
  loggedIn: PropTypes.bool.isRequired,
  isWideBrowser: PropTypes.bool.isRequired,
  showingSidenav: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  onShowSidenav: PropTypes.func.isRequired,
  onShowQuicksearch: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default withRouter(
  connect(
    /* istanbul ignore next */
    state => ({
      loggedIn: authSelectors.isLoggedIn(state),
      isWideBrowser: browserSelectors.isWideBrowser(state)
    })
  )(Header)
)
