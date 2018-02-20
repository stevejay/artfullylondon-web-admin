import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withState } from 'recompose'

import FadeTransition from '_src/shared/components/transition/fade'
import Button from '_src/shared/components/button'
import * as appUpdaterActions from '../actions'
import './app-updater.scss'

export class AppUpdater extends React.PureComponent {
  componentWillMount () {
    const { dispatch, setShouldUpdate } = this.props
    dispatch(appUpdaterActions.checkIfAppWasUpdated())
    dispatch(appUpdaterActions.checkForNewAppVersion()).then(() => {
      setShouldUpdate(true)
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
