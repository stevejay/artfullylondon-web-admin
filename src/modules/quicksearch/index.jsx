import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Modal } from 'react-overlays'
import Close from 'react-icons/lib/fa/close'

import Logo from '_src/components/logo'
import IconButton from '_src/components/button/icon'
import QuicksearchForm from '_src/modules/quicksearch/forms/quicksearch'
import Transition from '_src/modules/quicksearch/components/transition'
import * as searchConstants from '_src/constants/search'
import * as modalActions from '_src/actions/modal'
import * as searchActions from '_src/actions/search'
import './index.scss'

function DialogTransition (props) {
  return <Transition {...props} styleName='dialog-transition' timeout={200} />
}

function BackdropTransition (props) {
  return <Transition {...props} styleName='backdrop-transition' timeout={200} />
}

export class Quicksearch extends React.Component {
  shouldComponentUpdate (nextProps) {
    return nextProps.show !== this.props.show
  }
  handleHideQuicksearch = () => {
    this.props.clearAutocomplete()
    this.props.hideQuicksearch()
  }
  handleSubmit = ({ term, entityType }) => {
    this.props.clearAutocomplete()
    this.props.hideQuicksearch()

    this.props.pushBasicSearchToUrl({
      searchType: searchConstants.SEARCH_TYPE_BASIC,
      query: { term, entityType }
    })
  }
  render () {
    const { show, hideQuicksearch } = this.props

    return (
      <Modal
        show={show}
        transition={DialogTransition}
        backdrop
        backdropTransition={BackdropTransition}
        backdropClassName='backdrop'
        aria-label='Quicksearch'
        styleName='modal'
        onHide={this.handleHideQuicksearch}
      >
        <div styleName='quicksearch'>
          <div styleName='header'>
            <Logo size='small' />
            <IconButton
              icon={Close}
              onClick={hideQuicksearch}
              aria-label='Close quicksearch dialog'
            />
          </div>
          <div styleName='form'>
            <QuicksearchForm onSubmit={this.handleSubmit} />
          </div>
        </div>
      </Modal>
    )
  }
}

Quicksearch.propTypes = {
  show: PropTypes.bool.isRequired,
  pushBasicSearchToUrl: PropTypes.func.isRequired,
  hideQuicksearch: PropTypes.func.isRequired,
  clearAutocomplete: PropTypes.func.isRequired
}

export default connect(
  state => ({
    show: state.modal.showQuicksearch
  }),
  dispatch => ({
    pushBasicSearchToUrl: bindActionCreators(
      searchActions.pushBasicSearchToUrl,
      dispatch
    ),
    clearAutocomplete: bindActionCreators(
      searchActions.clearAutocomplete,
      dispatch
    ),
    hideQuicksearch: bindActionCreators(modalActions.hideQuicksearch, dispatch)
  })
)(Quicksearch)
