import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import _ from 'lodash'

import Form from '_src/components/form'
import FormRow from '_src/components/form/row'
import TextField from '_src/components/text/field'
import FormButtons from '_src/components/form/buttons'
import Divider from '_src/components/divider'
import DropdownField from '_src/components/dropdown/field'
import LinksField from '_src/components/links/field'
import ImagesField from '_src/components/images/field'
import HtmlTextField from '_src/components/html-text/field'
import * as talentLib from '_src/lib/talent'
import * as entityConstants from '_src/constants/entity'
import * as talentConstants from '_src/constants/talent'
import * as formConstants from '_src/constants/form'
import * as imageActions from '_src/actions/image'
import * as linkActions from '_src/actions/link'
import constraint from '_src/constants/talent-constraint'

export class EditTalentForm extends React.Component {
  handleChangeTalentType = (_, newValue) => {
    if (newValue === talentConstants.TALENT_TYPE_GROUP) {
      this.props.change('firstNames', '')
    }
  }
  render () {
    const {
      isEdit,
      initialValues,
      submitting,
      talentTypeValue,
      handleSubmit,
      onCancel,
      imageActions,
      linkActions
    } = this.props

    const isGroup = !talentLib.isIndividualTalent(talentTypeValue)

    return (
      <Form onSubmit={handleSubmit}>
        <Divider />
        <FormRow>
          <Field
            label='Talent Type'
            name='talentType'
            component={DropdownField}
            options={talentConstants.TALENT_TYPES_DROPDOWN_OPTIONS}
            required
            searchable={false}
            onChange={this.handleChangeTalentType}
          />
          {isEdit &&
            <Field
              label='Status'
              name='status'
              component={DropdownField}
              options={initialValues.validStatuses}
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
            parentFormName={formConstants.EDIT_TALENT_FORM_NAME}
            linkActions={linkActions}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Images'
            entityType={entityConstants.ENTITY_TYPE_TALENT}
            name='images'
            component={ImagesField}
            parentFormName={formConstants.EDIT_TALENT_FORM_NAME}
            imageActions={imageActions}
            showModal={_.noop}
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
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  talentTypeValue: PropTypes.string,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.any,
  handleSubmit: PropTypes.func.isRequired,
  imageActions: PropTypes.object.isRequired,
  linkActions: PropTypes.object.isRequired,
  change: PropTypes.func.isRequired
}

const WrappedEditTalentForm = reduxForm({
  form: formConstants.EDIT_TALENT_FORM_NAME,
  enableReinitialize: true
})(EditTalentForm)

const selector = formValueSelector(formConstants.EDIT_TALENT_FORM_NAME)

export default connect(
  state => ({ talentTypeValue: selector(state, 'talentType') }),
  dispatch => ({
    imageActions: bindActionCreators(imageActions, dispatch),
    linkActions: bindActionCreators(linkActions, dispatch)
  })
)(WrappedEditTalentForm)
