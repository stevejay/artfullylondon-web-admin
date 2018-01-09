import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import Body from '_src/components/layout/body'
import BrowserResizeListener from '_src/components/browser-resize-listener'
import Dashboard from '_src/modules/dashboard/pages/dashboard'
import NotFound from '_src/modules/error/pages/not-found'
import Notifications from '_src/components/notifications'
import Header from '_src/modules/header'
import Sidenav from '_src/modules/sidenav'
import Quicksearch from '_src/modules/quicksearch'
import GenericModal from '_src/modules/generic-modal'
import * as types from '_src/constants/browser'

export class Routes extends React.Component {
  handleWindowResize = width => {
    this.props.dispatch({
      type: types.BROWSER_WIDTH_CHANGED,
      payload: { width }
    })
  }
  render () {
    return (
      <Body>
        <BrowserResizeListener onWindowResize={this.handleWindowResize} />
        <Notifications />
        <Sidenav pathname={this.props.location.pathname} />
        <Quicksearch />
        <GenericModal />
        <Header />
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </Body>
    )
  }
}

Routes.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
}

export default withRouter(connect()(Routes))
