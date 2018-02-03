import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import FadeTransition from '_src/components/transition/fade'
import Button from '_src/components/button'
import { selectors, appActions } from '_src/store'
import './index.scss'

export class AppUpdater extends React.Component {
  handleClick = () => {
    this.props.dispatch(appActions.updateApp())
  }
  render () {
    const { shouldUpdate } = this.props

    return (
      <FadeTransition in={shouldUpdate} timeout={200}>
        <section styleName='container'>
          <p styleName='message'>
            <strong>A new version of the app is available!</strong>&nbsp;
            Click the Update button to reload the page and update.
          </p>
          <Button onClick={this.handleClick} type='submit'>
            Update
          </Button>
        </section>
      </FadeTransition>
    )
  }
}

AppUpdater.propTypes = {
  shouldUpdate: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect(state => ({
  shouldUpdate: selectors.shouldUpdate(state)
}))(AppUpdater)
