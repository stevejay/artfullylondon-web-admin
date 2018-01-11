import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Modal } from 'react-overlays'
import Close from 'react-icons/lib/fa/close'

import Logo from '_src/components/logo'
import IconButton from '_src/components/button/icon'
import QuicksearchForm from '_src/modules/quicksearch/form'
import * as searchConstants from '_src/constants/search'
import { hideQuicksearch } from '_src/actions/modal'
import { clearAutocomplete, pushBasicSearchToUrl } from '_src/actions/search'
import Transition from './transition'
import './index.scss'

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
        aria-label='Quicksearch'
        styleName='modal'
        backdrop
        backdropClassName='backdrop'
        show={show}
        onHide={this.handleHideQuicksearch}
        transition={Transition}
        timeout={250}
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
    pushBasicSearchToUrl: bindActionCreators(pushBasicSearchToUrl, dispatch),
    hideQuicksearch: bindActionCreators(hideQuicksearch, dispatch),
    clearAutocomplete: bindActionCreators(clearAutocomplete, dispatch)
  })
)(Quicksearch)
