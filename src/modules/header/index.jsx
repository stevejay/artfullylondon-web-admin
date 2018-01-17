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
import LogoHeader from '_src/components/logo/header'
import Toolbar from '_src/components/toolbar'
import ToolbarItem from '_src/components/toolbar/item'
import HeaderDropdown from '_src/modules/header/components/dropdown'
import * as authSelectors from '_src/store/selectors/auth'
import * as browserSelectors from '_src/store/selectors/browser'
import * as menuConstants from '_src/constants/menu'
import * as modalActions from '_src/actions/modal'
import * as authActions from '_src/actions/auth'
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
  render () {
    const {
      showSidenav,
      showQuicksearch,
      loggedIn,
      isWideBrowser,
      showingSidenav,
      history,
      logOut
    } = this.props

    if (!loggedIn || this.state.hasError) {
      return null
    }

    return [
      <LogoHeader
        key='logo'
        styleName='logo'
        size={isWideBrowser ? 'medium' : 'small'}
      />,
      <Toolbar key='toolbar'>
        {!isWideBrowser &&
          <ToolbarItem>
            <IconButton
              icon={Search}
              onClick={showQuicksearch}
              aria-label='Show quicksearch dialog'
              style={{ marginRight: '1.5rem' }}
            />
          </ToolbarItem>}
        {!isWideBrowser &&
          <ToolbarItem>
            <IconButton
              icon={Bars}
              onClick={showSidenav}
              aria-label='Show navigation menu'
              aria-controls='sidenav'
              ariaExpanded={showingSidenav}
            />
          </ToolbarItem>}
        {isWideBrowser &&
          menuConstants.MENUS.map(menu => (
            <ToolbarItem key={menu.label} styleName='dropdown-toolbar-item'>
              <HeaderDropdown
                label={menu.label}
                items={menu.items}
                history={history}
              />
            </ToolbarItem>
          ))}
        {isWideBrowser &&
          <ToolbarItem>
            <Button onClick={logOut} ariaLabel='Log out of the app'>
              Log Out
            </Button>
          </ToolbarItem>}
        {isWideBrowser &&
          <ToolbarItem>
            <Button
              onClick={showQuicksearch}
              ariaLabel='Show quicksearch dialog'
            >
              Quicksearch
            </Button>
          </ToolbarItem>}
      </Toolbar>
    ]
  }
}

/* istanbul ignore next */
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
    /* istanbul ignore next */
    state => ({
      loggedIn: authSelectors.isLoggedIn(state),
      isWideBrowser: browserSelectors.isWideBrowser(state),
      showingSidenav: state.modal.showSidenav
    }),
    /* istanbul ignore next */
    dispatch => ({
      showSidenav: bindActionCreators(modalActions.showSidenav, dispatch),
      showQuicksearch: bindActionCreators(
        modalActions.showQuicksearch,
        dispatch
      ),
      logOut: bindActionCreators(authActions.logOut, dispatch)
    })
  )(Header)
)
