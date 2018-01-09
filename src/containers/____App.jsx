import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Body from '_src/components/layout/Body'
import BrowserResizeListener from '_src/components/browser-resize-listener'
import { ALLOWED_BROWSER_WIDTH_TYPES } from '_src/constants/browser'
import QuicksearchModal from '_src/containers/Modals/Quicksearch'
import Header from '_src/containers/Header'
import Sidenav from '_src/containers/Sidenav'
import Notifications from '_src/containers/Notifications'
import GenericModal from '_src/containers/GenericModal'
import { browserWidthChanged } from '_src/actions/browser'

class App extends React.Component {
  render () {
    const {
      location,
      children,
      browserWidthType,
      browserWidthChanged
    } = this.props

    return (
      <Body>
        <BrowserResizeListener
          browserWidthType={browserWidthType}
          browserWidthChanged={browserWidthChanged}
        />
        <Notifications />
        <Sidenav pathname={location.pathname} />
        <QuicksearchModal />
        <GenericModal />
        <Header />
        {children}
      </Body>
    )
  }
}

App.propTypes = {
  children: PropTypes.object,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  browserWidthType: PropTypes.oneOf(ALLOWED_BROWSER_WIDTH_TYPES).isRequired,
  browserWidthChanged: PropTypes.func.isRequired
}

export default connect(
  state => ({
    browserWidthType: state.browser.widthType
  }),
  dispatch => ({
    browserWidthChanged: bindActionCreators(browserWidthChanged, dispatch)
  })
)(App)
