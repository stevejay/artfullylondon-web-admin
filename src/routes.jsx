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
import * as authSelectors from '_src/store/selectors/auth'
import * as browserActionTypes from '_src/constants/actions/browser'

export class Routes extends React.Component {
  handleWindowResize = width => {
    this.props.dispatch({
      type: browserActionTypes.BROWSER_WIDTH_CHANGED,
      payload: { width }
    })
  }
  render () {
    const { loggedIn } = this.props

    console.log('loggedIn', loggedIn)

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
        {loggedIn &&
          <PageMain>
            <PageHeader><Header /></PageHeader>
            {false &&
              <Switch>
                <Route exact path='/' component={Dashboard} />
                <Route component={NotFound} />
              </Switch>}
            <PageFooter><Footer /></PageFooter>
          </PageMain>}
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
    loggedIn: authSelectors.isLoggedIn(state)
  }))(Routes)
)
