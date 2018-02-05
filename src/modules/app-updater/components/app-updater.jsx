import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withState } from 'recompose'

import FadeTransition from '_src/components/transition/fade'
import Button from '_src/components/button'
import * as appUpdaterActions from '_src/modules/app-updater/actions'
import './app-updater.scss'

export class AppUpdater extends React.Component {
  constructor (props) {
    super(props)
    this.props.dispatch(appUpdaterActions.checkIfAppWasUpdated())
    this.props.dispatch(appUpdaterActions.checkForNewAppVersion()).then(() => {
      this.props.setShouldUpdate(true)
    })
  }
  handleClick = () => {
    this.props.dispatch(appUpdaterActions.updateApp())
  }
  render () {
    return (
      <FadeTransition in={this.props.shouldUpdate}>
        <aside styleName='container' role='note'>
          <p styleName='message'>
            A new version of the app is available!
            Click the Update button to reload the page and update.
          </p>
          <Button onClick={this.handleClick} type='submit'>
            Update
          </Button>
        </aside>
      </FadeTransition>
    )
  }
}

AppUpdater.propTypes = {
  shouldUpdate: PropTypes.bool.isRequired,
  setShouldUpdate: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect()(
  withState('shouldUpdate', 'setShouldUpdate', false)(AppUpdater)
)
