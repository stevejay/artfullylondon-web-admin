import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import * as reduxForm from 'redux-form'

import EntityImage from '_src/modules/entity/components/image'
import EntityDetailsContainer
  from '_src/modules/entity/components/details-container'
import EntityHeading from '_src/modules/entity/components/heading'
import EditTalentForm from '_src/modules/talent/forms/edit-talent'
import * as talentLib from '_src/lib/talent'
import * as entityConstants from '_src/constants/entity'
import { actions as entityActions } from '_src/modules/entity'
import { actions as notificationActions } from '_src/modules/notification'
import { LINK_EDITOR_FORM_NAME } from '_src/modules/link'
import { IMAGE_EDITOR_FORM_NAME } from '_src/modules/image'
import * as talentConstants from '_src/modules/talent/constants'
import * as mappingsLib from '_src/lib/mappings'

export class TalentEditOrCreate extends React.Component {
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
          isEdit,
          talentConstants.EDIT_TALENT_FORM_NAME,
          talentConstants.TALENT_NORMALISER,
          talentConstants.TALENT_CONSTRAINT,
          mappingsLib.mapTalentToServer
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
  dispatch: PropTypes.func.isRequired,
  imageEditorIsPristine: PropTypes.bool.isRequired,
  linkEditorIsPristine: PropTypes.bool.isRequired
}

export default withRouter(
  /* istanbul ignore next */
  connect(state => ({
    imageEditorIsPristine: reduxForm.isPristine(IMAGE_EDITOR_FORM_NAME)(state),
    linkEditorIsPristine: reduxForm.isPristine(LINK_EDITOR_FORM_NAME)(state)
  }))(TalentEditOrCreate)
)
