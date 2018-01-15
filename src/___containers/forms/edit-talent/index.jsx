import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import Form from '_src/components/form'
import FormRow from '_src/components/form/row'
import TextField from '_src/components/text/field'
import FormButtons from '_src/components/form/buttons'
import Divider from '_src/components/divider'
import DropdownField from '_src/components/dropdown/field'
import { ENTITY_TYPE_TALENT } from '_src/constants/entity'
import LinksField from '_src/components/links/field'
import ImagesField from '_src/components/images/field'
import HtmlTextField from '_src/components/html-text/field'
import { isIndividualTalent } from '_src/lib/talent'
import {
  TALENT_TYPES_DROPDOWN_OPTIONS,
  TALENT_TYPE_GROUP
} from '_src/constants/talent'
import { EDIT_TALENT_FORM_NAME } from '_src/constants/form'
import * as imageActions from '_src/actions/image'
import * as linkActions from '_src/actions/link'
import { showModal } from '_src/actions/modal'

export class EditTalentForm extends React.Component {
  handleChangeTalentType = (_, newValue) => {
    if (newValue === TALENT_TYPE_GROUP) {
      this.props.change('firstNames', '')
    }
  }
  render () {
    const {
      isEdit,
      validStatuses,
      showModal,
      submitting,
      talentTypeValue,
      handleSubmit,
      onCancel,
      constraint,
      imageActions,
      linkActions
    } = this.props

    const isGroup = !isIndividualTalent(talentTypeValue)

    return (
      <Form onSubmit={handleSubmit}>
        <Divider />
        <FormRow>
          <Field
            label='Talent Type'
            name='talentType'
            component={DropdownField}
            options={TALENT_TYPES_DROPDOWN_OPTIONS}
            required
            searchable={false}
            onChange={this.handleChangeTalentType}
          />
          {isEdit &&
            <Field
              label='Status'
              name='status'
              component={DropdownField}
              options={validStatuses}
              searchable={false}
            />}
        </FormRow>
        <FormRow>
          <Field
            label='First Names'
            name='firstNames'
            component={TextField}
            disabled={isGroup}
            forceSingleLine
            maxLength={constraint.firstNames.length.maximum}
          />
          <Field
            label='Last Name / Group Name'
            name='lastName'
            component={TextField}
            required
            forceSingleLine
            maxLength={constraint.lastName.length.maximum}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Common Role'
            name='commonRole'
            component={TextField}
            required
            forceSingleLine
            maxLength={constraint.commonRole.length.maximum}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Description'
            name='description'
            component={HtmlTextField}
            maxLength={5000}
          />
        </FormRow>
        <FormRow>
          <Field
            label='We Say'
            name='weSay'
            component={TextField}
            maxLength={constraint.weSay.length.maximum}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Links'
            name='links'
            component={LinksField}
            parentFormName={EDIT_TALENT_FORM_NAME}
            linkActions={linkActions}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Images'
            entityType={ENTITY_TYPE_TALENT}
            name='images'
            component={ImagesField}
            parentFormName={EDIT_TALENT_FORM_NAME}
            imageActions={imageActions}
            showModal={showModal}
          />
        </FormRow>
        <Divider />
        <FormButtons
          submitting={submitting}
          onCancel={isEdit ? onCancel : null}
        />
      </Form>
    )
  }
}

EditTalentForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  isEdit: PropTypes.bool.isRequired,
  talentTypeValue: PropTypes.string,
  validStatuses: PropTypes.array.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.any,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  constraint: PropTypes.object.isRequired,
  imageActions: PropTypes.object.isRequired,
  linkActions: PropTypes.object.isRequired,
  showModal: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired
}

const WrappedEditTalentForm = reduxForm({
  form: EDIT_TALENT_FORM_NAME
})(EditTalentForm)

const selector = formValueSelector(EDIT_TALENT_FORM_NAME)

export default connect(
  state => ({
    initialValues: state.talentForEdit.entity,
    validStatuses: state.talentForEdit.entity.validStatuses,
    isEdit: !!state.talentForEdit.entityId,
    talentTypeValue: selector(state, 'talentType'),
    enableReinitialize: true
  }),
  dispatch => ({
    imageActions: bindActionCreators(imageActions, dispatch),
    linkActions: bindActionCreators(linkActions, dispatch),
    showModal: bindActionCreators(showModal, dispatch)
  })
)(WrappedEditTalentForm)
