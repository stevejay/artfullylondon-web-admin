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
import Notifications from '_src/components/notifications'
import Sidenav from '_src/modules/sidenav'
import Quicksearch from '_src/modules/quicksearch'
import LoginPage from '_src/modules/auth/pages/login'
import * as authActions from '_src/actions/auth'
import * as authSelectors from '_src/store/selectors/auth'
import * as authActionTypes from '_src/constants/action/auth'
import * as browserActionTypes from '_src/constants/action/browser'

export class Routes extends React.Component {
  constructor (props) {
    super(props)
    this.state = { autoLoginTried: false }
    props.dispatch({ type: authActionTypes.ATTEMPT_AUTO_LOG_IN })
  }
  handleWindowResize = width => {
    this.props.dispatch({
      type: browserActionTypes.BROWSER_WIDTH_CHANGED,
      payload: { width }
    })
  }
  render () {
    const { loggedIn, autoLogInAttempted } = this.props

    if (!autoLogInAttempted) {
      return null
    }

    return (
      <Page>
        <BrowserResizeListener onWindowResize={this.handleWindowResize} />
        <Notifications />
        <Sidenav pathname={this.props.location.pathname} />
        <Quicksearch />
        {!loggedIn &&
          <PageMain>
            <Switch>
              <Route exact path='/login' component={LoginPage} />
              <Redirect to='/login' />
            </Switch>
          </PageMain>}
        {loggedIn && [
          <PageHeader key='header'><Header /></PageHeader>,
          <PageMain key='main'>
            {false &&
              <Switch>
                <Route exact path='/' component={Dashboard} />
                <Route component={NotFound} />
              </Switch>}
          </PageMain>,
          <PageFooter key='footer'><Footer /></PageFooter>
        ]}
      </Page>
    )
  }
}

Routes.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
}

export default withRouter(
  connect(state => ({
    autoLogInAttempted: state.auth.autoLogInAttempted,
    loggedIn: authSelectors.isLoggedIn(state)
  }))(Routes)
)
