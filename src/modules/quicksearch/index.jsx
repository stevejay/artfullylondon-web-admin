import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Close from 'react-icons/lib/fa/close'

import Toolbar from '_src/components/toolbar'
import ToolbarItem from '_src/components/toolbar/item'
import Modal from '_src/components/modal'
import Logo from '_src/components/logo'
import IconButton from '_src/components/button/icon'
import QuicksearchForm from '_src/modules/quicksearch/forms/quicksearch'
import BasicTransition from '_src/components/transition/basic'
import * as searchConstants from '_src/constants/search'
import * as modalActions from '_src/actions/modal'
import * as searchActions from '_src/actions/search'
import './index.scss'

const ModalTransition = props => (
  <BasicTransition {...props} styleName='modal-transition' />
)

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
        transition={ModalTransition}
        onHide={this.handleHideQuicksearch}
        aria-label='Quicksearch'
      >
        <div styleName='modal'>
          <Toolbar styleName='toolbar'>
            <ToolbarItem>
              <Logo size='small' />
            </ToolbarItem>
            <ToolbarItem>
              <IconButton
                icon={Close}
                onClick={hideQuicksearch}
                aria-label='Close quicksearch dialog'
              />
            </ToolbarItem>
          </Toolbar>
          <QuicksearchForm onSubmit={this.handleSubmit} />
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
