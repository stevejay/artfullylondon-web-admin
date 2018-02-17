import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as reduxForm from 'redux-form'

import { Image, IMAGE_EDITOR_FORM_NAME } from '_src/modules/image'
import {
  EntityDetailsContainer,
  EntityHeading,
  actions as entityActions
} from '_src/modules/entity'
import EditVenueForm from '../forms/edit-venue'
import { actions as notificationActions } from '_src/modules/notification'
import { LINK_EDITOR_FORM_NAME } from '_src/modules/link'
import * as venueConstants from '../constants'
import * as venueMapper from '../lib/mapper'
import { FullVenue } from '_src/entities/venue'
import entityType from '_src/entities/entity-type'

export class VenueEditOrCreate extends React.Component {
  shouldComponentUpdate (nextProps) {
    return nextProps.entity !== this.props.entity
  }
  handleSubmit = values => {
    const {
      imageEditorIsPristine,
      linkEditorIsPristine,
      isEdit,
      dispatch
    } = this.props

    // TODO add in the opening time editors to the pristine checks?

    if (imageEditorIsPristine && linkEditorIsPristine) {
      dispatch(
        entityActions.saveEntity(
          entityType.VENUE,
          values,
          isEdit,
          venueConstants.EDIT_VENUE_FORM_NAME,
          venueConstants.VENUE_NORMALISER,
          venueConstants.VENUE_CONSTRAINT,
          venueMapper.mapSubmittedValues
        )
      )
    } else {
      dispatch(
        notificationActions.addErrorNotification(
          'Submit Cancelled',
          'There are unsaved changes in the sub editors.'
        )
      )
    }
  }
  render () {
    const { entity, isEdit, onCancel } = this.props

    return (
      <React.Fragment>
        <Image
          entityType={entityType.VENUE}
          images={entity.images}
        />
        <EntityHeading>
          {entity.name || 'New Venue'}
        </EntityHeading>
        <EntityDetailsContainer>
          <EditVenueForm
            isEdit={isEdit}
            initialValues={venueMapper.getInitialValues(entity)}
            onSubmit={this.handleSubmit}
            onCancel={onCancel}
          />
        </EntityDetailsContainer>
      </React.Fragment>
    )
  }
}

VenueEditOrCreate.propTypes = {
  entity: PropTypes.instanceOf(FullVenue).isRequired,
  isEdit: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  imageEditorIsPristine: PropTypes.bool.isRequired,
  linkEditorIsPristine: PropTypes.bool.isRequired
}

export default connect(
  /* istanbul ignore next */
  state => ({
    imageEditorIsPristine: reduxForm.isPristine(IMAGE_EDITOR_FORM_NAME)(state),
    linkEditorIsPristine: reduxForm.isPristine(LINK_EDITOR_FORM_NAME)(state)
  })
)(VenueEditOrCreate)
