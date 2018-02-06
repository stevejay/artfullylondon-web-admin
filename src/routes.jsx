import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Page from '_src/components/page'
import PageHeader from '_src/components/page/header'
import PageMain from '_src/components/page/main'
import PageFooter from '_src/components/page/footer'
import { Header } from '_src/modules/header'
import { Footer } from '_src/modules/footer'
import { NotificationContainer } from '_src/modules/notification'
import { AppUpdater } from '_src/modules/app-updater'
import { Sidenav } from '_src/modules/sidenav'
import { NotFoundPage } from '_src/modules/error'
import { DashboardPage } from '_src/modules/dashboard'
import { LoginPage, actions as userActions } from '_src/modules/user'
import { TagsTypePage } from '_src/modules/tag'
import { ResultsPage, Quicksearch } from '_src/modules/search'
import EntityDetailPage from '_src/modules/entity/pages/detail'
import EntityEditOrCreatePage from '_src/modules/entity/pages/edit-or-create'
import * as store from '_src/store'

export class Routes extends React.Component {
  constructor (props) {
    super(props)
    this.state = { showQuicksearch: false, showSidenav: false }
    props.dispatch(userActions.attemptAutoLogIn())
    props.dispatch(store.serverConstantActions.fetchServerConstants())
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
        {loggedIn &&
          <React.Fragment>
            <PageHeader>
              <Header
                showingSidenav={showSidenav}
                onShowQuicksearch={this.handleShowQuicksearch}
                onShowSidenav={this.handleShowSidenav}
              />
            </PageHeader>
            <PageMain>
              <Switch>
                <Route path='/' exact component={DashboardPage} />
                <Route path='/tags/:type' component={TagsTypePage} />
                <Route path='/search' component={ResultsPage} />
                <Route
                  path='/:entityType(talent|venue|event|event-series)'
                  exact
                  component={EntityEditOrCreatePage}
                />
                <Route
                  path='/:entityType(talent|venue|event|event-series)/edit/(.*)'
                  component={EntityEditOrCreatePage}
                />
                <Route
                  path='/:entityType(talent|venue|event|event-series)/(.*)'
                  component={EntityDetailPage}
                />
                <Redirect from='/login' to='/' />
                <Route component={NotFoundPage} />
              </Switch>
            </PageMain>
            <PageFooter><Footer /></PageFooter>
          </React.Fragment>}
        <AppUpdater />
        <NotificationContainer />
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
      autoLogInAttempted: store.selectors.autoLogInAttempted(state),
      loggedIn: store.selectors.userIsLoggedIn(state)
    })
  )(Routes)
)
