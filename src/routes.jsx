import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { withStateHandlers } from 'recompose'

import Page from '_src/shared/components/page'
import PageHeader from '_src/shared/components/page/header'
import PageMain from '_src/shared/components/page/main'
import PageFooter from '_src/shared/components/page/footer'
import NotFoundPage from '_src/shared/components/error/not-found-page'
import { Header, Sidenav } from '_src/modules/nav'
import { Footer } from '_src/modules/footer'
import { NotificationContainer } from '_src/modules/notification'
import { AppUpdater } from '_src/modules/app-updater'
import { DashboardPage } from '_src/modules/dashboard'
import {
  LoginPage,
  actions as userActions,
  selectors as userSelectors
} from '_src/modules/user'
import { actions as referenceActions } from '_src/modules/reference-data'
import { TagsTypePage } from '_src/modules/tag'
import { ResultsPage, Quicksearch } from '_src/modules/search'
import { EntityRoutes } from '_src/modules/entity'
import { TalentEditOrCreate, TalentDetail } from '_src/modules/talent'
import { VenueEditOrCreate, VenueDetail } from '_src/modules/venue'
import {
  EventSeriesEditOrCreate,
  EventSeriesDetail
} from '_src/modules/event-series'
import { EventEditOrCreate, EventDetail } from '_src/modules/event'
import entityType from '_src/domain/types/entity-type'

export class Routes extends React.PureComponent {
  componentWillMount () {
    this.props.dispatch(userActions.attemptAutoLogIn())
    this.props.dispatch(referenceActions.fetchReferenceData())
  }
  render () {
    const {
      loggedIn,
      autoLogInAttempted,
      showingQuicksearch,
      showingSidenav,
      showQuicksearch,
      hideQuicksearch,
      showSidenav,
      hideSidenav,
      location: { pathname }
    } = this.props

    if (!autoLogInAttempted) {
      return null
    }

    return (
      <Page>
        <Sidenav
          show={showingSidenav}
          onHide={hideSidenav}
          pathname={pathname}
        />
        <Quicksearch show={showingQuicksearch} onHide={hideQuicksearch} />
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
                showingSidenav={showingSidenav}
                onShowQuicksearch={showQuicksearch}
                onShowSidenav={showSidenav}
              />
            </PageHeader>
            <PageMain>
              <Switch>
                <Route path='/' exact component={DashboardPage} />
                <Route path='/tags/:type' component={TagsTypePage} />
                <Route path='/search' component={ResultsPage} />
                <Route
                  path='/talent'
                  render={/* istanbul ignore next */
                  () => (
                    <EntityRoutes
                      entityType={entityType.TALENT}
                      editOrCreateComponent={TalentEditOrCreate}
                      detailComponent={TalentDetail}
                    />
                  )}
                />
                <Route
                  path='/venue'
                  render={/* istanbul ignore next */
                  () => (
                    <EntityRoutes
                      entityType={entityType.VENUE}
                      editOrCreateComponent={VenueEditOrCreate}
                      detailComponent={VenueDetail}
                    />
                  )}
                />
                <Route
                  path='/event-series'
                  render={/* istanbul ignore next */
                  () => (
                    <EntityRoutes
                      entityType={entityType.EVENT_SERIES}
                      editOrCreateComponent={EventSeriesEditOrCreate}
                      detailComponent={EventSeriesDetail}
                    />
                  )}
                />
                <Route
                  path='/event'
                  render={/* istanbul ignore next */
                  () => (
                    <EntityRoutes
                      entityType={entityType.EVENT}
                      editOrCreateComponent={EventEditOrCreate}
                      detailComponent={EventDetail}
                    />
                  )}
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
  location: PropTypes.object.isRequired,
  showingQuicksearch: PropTypes.bool.isRequired,
  showingSidenav: PropTypes.bool.isRequired,
  showQuicksearch: PropTypes.func.isRequired,
  hideQuicksearch: PropTypes.func.isRequired,
  showSidenav: PropTypes.func.isRequired,
  hideSidenav: PropTypes.func.isRequired
}

export default withRouter(
  connect(
    /* istanbul ignore next */
    state => ({
      autoLogInAttempted: userSelectors.autoLogInAttempted(state),
      loggedIn: userSelectors.userIsLoggedIn(state)
    })
  )(
    withStateHandlers(
      { showingQuicksearch: false, showingSidenav: false },
      {
        showQuicksearch: /* istanbul ignore next */ () => () => ({
          showingQuicksearch: true
        }),
        hideQuicksearch: /* istanbul ignore next */ () => () => ({
          showingQuicksearch: false
        }),
        showSidenav: /* istanbul ignore next */ () => () => ({
          showingSidenav: true
        }),
        hideSidenav: /* istanbul ignore next */ () => () => ({
          showingSidenav: false
        })
      }
    )(Routes)
  )
)
