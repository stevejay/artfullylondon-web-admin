import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { isPristine } from 'redux-form'
import Loader from '_src/components/loader'
import Error from '_src/pages/error'
import EntityImage from '_src/components/entity/image'
import SectionsContainer from '_src/components/section/sections-container'
import DetailsContainer from '_src/components/entity/details-container'
import BasicSection from '_src/components/section/basic'
import CopyrightFooter from '_src/components/copyright-footer'
import EntityHeading from '_src/components/entity/heading'
import { ENTITY_TYPE_TALENT } from '_src/constants/entity'
import EditTalentForm from '_src/containers/forms/edit-talent'
import {
  IMAGE_EDITOR_FORM_NAME,
  LINK_EDITOR_FORM_NAME
} from '_src/constants/form'
import { saveEntity } from '_src/actions/entity'
import { addNotification } from '_src/actions/notifications'
import constraint from '_src/constants/talent-constraint'

class EditTalent extends React.Component {
  handleSubmit = values => {
    const {
      imageEditorIsPristine,
      linkEditorIsPristine,
      addNotification,
      saveEntity
    } = this.props

    if (imageEditorIsPristine && linkEditorIsPristine) {
      return saveEntity({
        entityType: ENTITY_TYPE_TALENT,
        values,
        isEdit: !!this.props.talentId
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
    const { talentId, talent, getInProgress, getFailed } = this.props

    if (getFailed) {
      return <Error statusCode={500} />
    }

    if (getInProgress || !talent || (talentId && talentId !== talent.id)) {
      return (
        <SectionsContainer>
          <Loader size='massive' />
        </SectionsContainer>
      )
    }

    return this.renderTalent()
  }
  renderTalent () {
    const { talentId, talent } = this.props
    const { images, firstNames, lastName } = talent
    const name = firstNames ? firstNames + ' ' + lastName : lastName

    return (
      <SectionsContainer>
        <BasicSection>
          <EntityImage entityType={ENTITY_TYPE_TALENT} images={images} />
          <EntityHeading>{talentId ? name : 'New Talent'}</EntityHeading>
          <DetailsContainer>
            <EditTalentForm
              constraint={constraint}
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

EditTalent.propTypes = {
  talentId: PropTypes.string,
  talent: PropTypes.object,
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
      talentId: ownProps.params.splat,
      talent: state.talentForEdit.entity,
      getInProgress: state.talentForEdit.getInProgress,
      getFailed: state.talentForEdit.getFailed,
      imageEditorIsPristine: isPristine(IMAGE_EDITOR_FORM_NAME)(state),
      linkEditorIsPristine: isPristine(LINK_EDITOR_FORM_NAME)(state)
    }),
    dispatch => ({
      saveEntity: bindActionCreators(saveEntity, dispatch),
      addNotification: bindActionCreators(addNotification, dispatch)
    })
  )(EditTalent)
)
