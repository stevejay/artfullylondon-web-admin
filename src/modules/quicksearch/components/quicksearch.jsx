import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Close from 'react-icons/lib/fa/close'

import Toolbar from '_src/components/toolbar'
import ToolbarItem from '_src/components/toolbar/item'
import Modal from '_src/components/modal'
import Logo from '_src/components/logo'
import IconButton from '_src/components/button/icon'
import QuicksearchForm from '_src/modules/quicksearch/forms/quicksearch'
import ModalTransition
  from '_src/modules/quicksearch/components/modal-transition'
import { searchActions } from '_src/store'
import * as entityConstants from '_src/constants/entity'
import './quicksearch.scss'

export class Quicksearch extends React.Component {
  shouldComponentUpdate (nextProps) {
    return nextProps.show !== this.props.show
  }
  handleHideQuicksearch = () => {
    this.props.onHide()
  }
  handleSubmit = query => {
    this.handleHideQuicksearch()
    this.props.dispatch(searchActions.pushBasicSearchToUrl({ query }))
  }
  handleAutocompleteSearch = ({ term }) => {
    return this.props.dispatch(
      searchActions.autocompleteSearch(term, entityConstants.ENTITY_TYPE_ALL)
    )
  }
  handleAutocompleteSelect = entity => {
    this.handleHideQuicksearch()
    this.props.dispatch(searchActions.navigateToEntity(entity))
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
        <div styleName='modal-container'>
          <Toolbar styleName='toolbar'>
            <ToolbarItem>
              <Logo size='small' />
            </ToolbarItem>
            <ToolbarItem>
              <IconButton
                icon={Close}
                onClick={onHide}
                aria-label='Close quicksearch dialog'
                styleName='close-button'
              />
            </ToolbarItem>
          </Toolbar>
          <QuicksearchForm
            onSubmit={this.handleSubmit}
            onAutocompleteSearch={this.handleAutocompleteSearch}
            onAutocompleteSelect={this.handleAutocompleteSelect}
          />
        </div>
      </Modal>
    )
  }
}

Quicksearch.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect()(Quicksearch)
