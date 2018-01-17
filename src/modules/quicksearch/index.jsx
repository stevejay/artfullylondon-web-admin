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
import ModalTransition
  from '_src/modules/quicksearch/components/modal-transition'
import * as searchConstants from '_src/constants/search'
import * as searchActions from '_src/actions/search'
import './index.scss'

export class Quicksearch extends React.Component {
  shouldComponentUpdate (nextProps) {
    return nextProps.show !== this.props.show
  }
  handleHideQuicksearch = () => {
    this.props.clearAutocomplete()
    this.props.onHide()
  }
  handleSubmit = ({ term, entityType }) => {
    this.handleHideQuicksearch()

    this.props.pushBasicSearchToUrl({
      searchType: searchConstants.SEARCH_TYPE_BASIC,
      query: { term, entityType }
    })
  }
  render () {
    const { show, onHide } = this.props

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
                onClick={onHide}
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

/* istanbul ignore next */
Quicksearch.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  pushBasicSearchToUrl: PropTypes.func.isRequired,
  clearAutocomplete: PropTypes.func.isRequired
}

export default connect(
  null,
  /* istanbul ignore next */
  dispatch => ({
    pushBasicSearchToUrl: bindActionCreators(
      searchActions.pushBasicSearchToUrl,
      dispatch
    ),
    clearAutocomplete: bindActionCreators(
      searchActions.clearAutocomplete,
      dispatch
    )
  })
)(Quicksearch)
