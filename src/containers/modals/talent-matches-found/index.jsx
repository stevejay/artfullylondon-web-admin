import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ModalContainer from '_src/components/modal/container'
import { createTalentForEvent } from '_src/actions/entity'
import TalentMatchesFoundForm
  from '_src/containers/forms/talent-matches-found'

export class TalentMatchesFoundModal extends React.Component {
  handleSubmit = () => {
    const { createTalentForEvent, values, parentFormName } = this.props

    createTalentForEvent({
      values,
      parentFormName,
      forceCreate: true
    })

    this.props.onHide()
  }
  handleCancel = () => {
    this.props.onHide()
  }
  render () {
    const { items, onHide } = this.props

    return (
      <ModalContainer
        title='Existing Talents Found'
        type='narrow'
        onHide={this.props.onHide}
      >
        <TalentMatchesFoundForm
          onSubmit={this.handleSubmit}
          onCancel={onHide}
          talents={items}
        />
      </ModalContainer>
    )
  }
}

TalentMatchesFoundModal.propTypes = {
  onHide: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      firstNames: PropTypes.string,
      lastName: PropTypes.string.isRequired,
      commonRole: PropTypes.string.isRequired
    })
  ).isRequired,
  values: PropTypes.object.isRequired,
  parentFormName: PropTypes.string.isRequired,
  createTalentForEvent: PropTypes.func.isRequired
}

export default connect(null, dispatch => ({
  createTalentForEvent: bindActionCreators(createTalentForEvent, dispatch)
}))(TalentMatchesFoundModal)
