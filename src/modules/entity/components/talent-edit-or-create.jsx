import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { isPristine } from 'redux-form'

import EntityImage from '_src/components/entity/image'
import EntityDetailsContainer from '_src/components/entity/details-container'
import EntityHeading from '_src/components/entity/heading'
import EditTalentForm from '_src/modules/entity/forms/edit-talent'
import * as talentLib from '_src/lib/talent'
import * as entityConstants from '_src/constants/entity'
import * as notificationActions from '_src/store/actions/notification'
import * as entityActions from '_src/store/actions/entity'
import * as notificationsConstants from '_src/constants/notifications'
import * as formConstants from '_src/constants/form'

class TalentEditOrCreate extends React.Component {
  handleSubmit = values => {
    const {
      imageEditorIsPristine,
      linkEditorIsPristine,
      isEdit,
      dispatch
    } = this.props

    if (imageEditorIsPristine && linkEditorIsPristine) {
      dispatch(
        entityActions.saveEntity(
          entityConstants.ENTITY_TYPE_TALENT,
          values,
          isEdit
        )
      )
    } else {
      dispatch(
        notificationActions.addNotification(
          notificationsConstants.NOTIFICATION_TYPE_ERROR,
          'Submit Cancelled',
          'There are unsaved changes in the sub editors.'
        )
      )
    }
  }
  handleCancel = event => {
    event.preventDefault()
    this.props.history.goBack()
  }
  render () {
    const { entity, isEdit } = this.props

    return (
      <React.Fragment>
        <EntityImage
          entityType={entityConstants.ENTITY_TYPE_TALENT}
          images={entity.images}
        />
        <EntityHeading>
          {talentLib.formatTalentName(entity) || 'New Talent'}
        </EntityHeading>
        <EntityDetailsContainer>
          <EditTalentForm
            isEdit={isEdit}
            initialValues={entity}
            onSubmit={this.handleSubmit}
            onCancel={this.handleCancel}
          />
        </EntityDetailsContainer>
      </React.Fragment>
    )
  }
}

TalentEditOrCreate.propTypes = {
  entity: PropTypes.object.isRequired,
  isEdit: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default withRouter(
  connect(state => ({
    imageEditorIsPristine: isPristine(formConstants.IMAGE_EDITOR_FORM_NAME)(
      state
    ),
    linkEditorIsPristine: isPristine(formConstants.LINK_EDITOR_FORM_NAME)(
      state
    )
  }))(TalentEditOrCreate)
)