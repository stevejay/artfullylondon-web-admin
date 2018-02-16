import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import * as reduxForm from 'redux-form'

import { Image, IMAGE_EDITOR_FORM_NAME } from '_src/modules/image'
import {
  EntityDetailsContainer,
  EntityHeading,
  actions as entityActions
} from '_src/modules/entity'
import EditTalentForm from '../forms/edit-talent'
import { actions as notificationActions } from '_src/modules/notification'
import { LINK_EDITOR_FORM_NAME } from '_src/modules/link'
import * as talentConstants from '../constants'
import * as talentMapper from '../lib/mapper'
import * as entityConstants from '_src/constants/entity'
import { FullTalent } from '_src/entities/talent'

export class TalentEditOrCreate extends React.Component {
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

    if (imageEditorIsPristine && linkEditorIsPristine) {
      dispatch(
        entityActions.saveEntity(
          entityConstants.ENTITY_TYPE_TALENT,
          values,
          isEdit,
          talentConstants.EDIT_TALENT_FORM_NAME,
          talentConstants.TALENT_NORMALISER,
          talentConstants.TALENT_CONSTRAINT,
          talentMapper.mapSubmittedValues
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
    this.props.history.push(`/talent/${this.props.entity.id}`)
  }
  render () {
    const { entity, isEdit } = this.props

    return (
      <React.Fragment>
        <Image
          entityType={entityConstants.ENTITY_TYPE_TALENT}
          images={entity.images}
        />
        <EntityHeading>
          {entity.name || 'New Talent'}
        </EntityHeading>
        <EntityDetailsContainer>
          <EditTalentForm
            isEdit={isEdit}
            initialValues={talentMapper.getInitialValues(entity)}
            onSubmit={this.handleSubmit}
            onCancel={this.handleCancel}
          />
        </EntityDetailsContainer>
      </React.Fragment>
    )
  }
}

TalentEditOrCreate.propTypes = {
  entity: PropTypes.instanceOf(FullTalent).isRequired,
  isEdit: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  imageEditorIsPristine: PropTypes.bool.isRequired,
  linkEditorIsPristine: PropTypes.bool.isRequired
}

export default withRouter(
  connect(
    /* istanbul ignore next */
    state => ({
      imageEditorIsPristine: reduxForm.isPristine(IMAGE_EDITOR_FORM_NAME)(
        state
      ),
      linkEditorIsPristine: reduxForm.isPristine(LINK_EDITOR_FORM_NAME)(state)
    })
  )(TalentEditOrCreate)
)
