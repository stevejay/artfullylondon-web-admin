import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Page from '_src/components/page'
import PageHeader from '_src/components/page/header'
import PageMain from '_src/components/page/main'
import PageFooter from '_src/components/page/footer'
import Header from '_src/modules/header'
import Footer from '_src/modules/footer'
import BrowserResizeListener from '_src/components/browser-resize-listener'
import Dashboard from '_src/modules/dashboard/pages/dashboard'
import NotFound from '_src/modules/error/pages/not-found'
import Notification from '_src/modules/notification'
import AppUpdater from '_src/modules/app-updater'
import Sidenav from '_src/modules/sidenav'
import Quicksearch from '_src/modules/quicksearch'
import LoginPage from '_src/modules/auth/pages/login'
import * as authActions from '_src/actions/auth'
import * as authSelectors from '_src/store/selectors/auth'
import * as appActionTypes from '_src/constants/action/app'
import * as authActionTypes from '_src/constants/action/auth'
import * as browserActionTypes from '_src/constants/action/browser'
import * as serverConstantsTypes from '_src/constants/action/server-constants'

export class Routes extends React.Component {
  constructor (props) {
    super(props)
    this.state = { showQuicksearch: false, showSidenav: false }
    props.dispatch({ type: authActionTypes.ATTEMPT_AUTO_LOG_IN })
    props.dispatch({ type: serverConstantsTypes.FETCH_SERVER_CONSTANTS })
    props.dispatch({ type: appActionTypes.CHECK_IF_APP_WAS_UPDATED })
  }
  handleWindowResize = width => {
    this.props.dispatch({
      type: browserActionTypes.BROWSER_WIDTH_CHANGED,
      payload: { width }
    })
  }
  handleHideQuicksearch = () => {
    this.setState({ showQuicksearch: false })
  }
  handleShowQuicksearch = () => {
    this.setState({ showQuicksearch: true })
  }
  handleHideSidenav = () => {
    this.setState({ showSidenav: false })
  }
  handleShowSidenav = () => {
    this.setState({ showSidenav: true })
  }
  render () {
    const { loggedIn, autoLogInAttempted } = this.props
    const { showQuicksearch, showSidenav } = this.state

    if (!autoLogInAttempted) {
      return null
    }

    return (
      <Page>
        <BrowserResizeListener onWindowResize={this.handleWindowResize} />
        <Sidenav
          show={showSidenav}
          onHide={this.handleHideSidenav}
          pathname={this.props.location.pathname}
        />
        <Quicksearch
          show={showQuicksearch}
          onHide={this.handleHideQuicksearch}
        />
        {!loggedIn &&
          <PageMain>
            <Switch>
              <Route exact path='/login' component={LoginPage} />
              <Redirect to='/login' />
            </Switch>
          </PageMain>}
        {loggedIn && [
          <PageHeader key='header'>
            <Header
              showingSidenav={showSidenav}
              onShowQuicksearch={this.handleShowQuicksearch}
              onShowSidenav={this.handleShowSidenav}
            />
          </PageHeader>,
          <PageMain key='main'>
            <Switch>
              <Route exact path='/' component={Dashboard} />
              <Route component={NotFound} />
            </Switch>
          </PageMain>,
          <PageFooter key='footer'><Footer /></PageFooter>
        ]}
        <AppUpdater />
        <Notification />
      </Page>
    )
  }
}

Routes.propTypes = {
  autoLogInAttempted: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
}

export default withRouter(
  connect(
    /* istanbul ignore next */
    state => ({
      autoLogInAttempted: state.auth.autoLogInAttempted,
      loggedIn: authSelectors.isLoggedIn(state)
    })
  )(Routes)
)
