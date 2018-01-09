import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { isPristine } from 'redux-form'
import { withRouter } from 'react-router'
import Loader from '_src/components/loader'
import Error from '_admin/pages/error'
import EntityImage from '_src/components/entity/image'
import SectionsContainer from '_src/components/section/sections-container'
import DetailsContainer from '_src/components/entity/details-container'
import BasicSection from '_src/components/section/basic'
import CopyrightFooter from '_src/components/copyright-footer'
import EntityHeading from '_src/components/entity/heading'
import EditVenueForm from '_src/containers/forms/edit-venue'
import { ENTITY_TYPE_VENUE } from '_src/constants/entity'
import {
  IMAGE_EDITOR_FORM_NAME,
  LINK_EDITOR_FORM_NAME
} from '_src/constants/form'
import { saveEntity } from '_src/actions/entity'
import { addNotification } from '_src/actions/notifications'
import venueConstraint from '_src/constants/venue-constraint'

class EditVenue extends React.Component {
  handleSubmit = values => {
    const {
      imageEditorIsPristine,
      linkEditorIsPristine,
      addNotification,
      saveEntity
    } = this.props

    if (imageEditorIsPristine && linkEditorIsPristine) {
      return saveEntity({
        entityType: ENTITY_TYPE_VENUE,
        values,
        isEdit: !!this.props.venueId
      })
    }

    addNotification({
      type: 'Error',
      title: 'Submit Cancelled',
      message: 'There are unsaved changes in the sub editors.'
    })
  }
  handleCancel = event => {
    event.preventDefault()
    this.props.history.goBack()
  }
  render () {
    const { venueId, venue, getInProgress, getFailed } = this.props

    if (getFailed) {
      return <Error statusCode={500} />
    }

    if (getInProgress || !venue || (venueId && venueId !== venue.id)) {
      return (
        <SectionsContainer>
          <Loader size='massive' />
        </SectionsContainer>
      )
    }

    return this.renderVenue()
  }
  renderVenue () {
    const { venue } = this.props
    const { images, name } = venue

    return (
      <SectionsContainer>
        <BasicSection>
          <EntityImage entityType={ENTITY_TYPE_VENUE} images={images} />
          <EntityHeading>{name || 'New Venue'}</EntityHeading>
          <DetailsContainer>
            <EditVenueForm
              constraint={venueConstraint}
              onSubmit={this.handleSubmit}
              onCancel={this.handleCancel}
            />
          </DetailsContainer>
        </BasicSection>
        <BasicSection>
          <CopyrightFooter />
        </BasicSection>
      </SectionsContainer>
    )
  }
}

EditVenue.propTypes = {
  venueId: PropTypes.string,
  venue: PropTypes.object,
  getInProgress: PropTypes.bool.isRequired,
  getFailed: PropTypes.bool.isRequired,
  imageEditorIsPristine: PropTypes.bool.isRequired,
  linkEditorIsPristine: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  saveEntity: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired
}

export default withRouter(
  connect(
    (state, ownProps) => ({
      venueId: ownProps.params.splat,
      venue: state.venueForEdit.entity,
      getInProgress: state.venueForEdit.getInProgress,
      getFailed: state.venueForEdit.getFailed,
      imageEditorIsPristine: isPristine(IMAGE_EDITOR_FORM_NAME)(state),
      linkEditorIsPristine: isPristine(LINK_EDITOR_FORM_NAME)(state)
    }),
    dispatch => ({
      saveEntity: bindActionCreators(saveEntity, dispatch),
      addNotification: bindActionCreators(addNotification, dispatch)
    })
  )(EditVenue)
)
