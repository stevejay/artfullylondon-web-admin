import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import _ from 'lodash'

import Form from '_src/components/form'
import FormRow from '_src/components/form/row'
import TextField from '_src/components/text/field'
import FormButtons from '_src/components/form/buttons'
import Divider from '_src/components/divider'
import SelectField from '_src/components/select/field'
import HtmlTextField from '_src/components/html-text/field'
import * as talentLib from '_src/lib/talent'
import * as entityConstants from '_src/constants/entity'
import * as talentDomainConstants from '_src/constants/talent'
import * as talentConstants from '_src/modules/talent/constants'
import { actions as imageActions, ImagesField } from '_src/modules/image'
import { actions as linkActions, LinksField } from '_src/modules/link'

export class EditTalentForm extends React.Component {
  handleChangeTalentType = (_, newValue) => {
    if (newValue === talentDomainConstants.TALENT_TYPE_GROUP) {
      this.props.change('firstNames', '')
    }
  }
  handleAddLink = values => {
    this.props.dispatch(
      linkActions.addLink(values, talentConstants.EDIT_TALENT_FORM_NAME)
    )
  }
  handleDeleteLink = id => {
    this.props.dispatch(
      linkActions.deleteLink(id, talentConstants.EDIT_TALENT_FORM_NAME)
    )
  }
  handleAddImage = values => {
    this.props.dispatch(
      imageActions.addImage(
        values,
        entityConstants.ENTITY_TYPE_TALENT,
        talentConstants.EDIT_TALENT_FORM_NAME
      )
    )
  }
  handleUpdateImage = ({ values, id }) => {
    return this.props.dispatch(
      imageActions.updateImage(
        values,
        id,
        talentConstants.EDIT_TALENT_FORM_NAME
      )
    )
  }
  handleSetMainImage = id => {
    this.props.dispatch(
      imageActions.setMainImage(id, talentConstants.EDIT_TALENT_FORM_NAME)
    )
  }
  handleDeleteImage = id => {
    this.props.dispatch(
      imageActions.deleteImage(id, talentConstants.EDIT_TALENT_FORM_NAME)
    )
  }
  render () {
    const {
      isEdit,
      initialValues,
      submitting,
      talentTypeValue,
      handleSubmit,
      onCancel
    } = this.props

    const isGroup = !talentLib.isIndividualTalent(talentTypeValue)

    return (
      <Form onSubmit={handleSubmit}>
        <Divider />
        <FormRow>
          <Field
            label='Talent Type'
            name='talentType'
            component={SelectField}
            options={talentConstants.TALENT_TYPES_DROPDOWN_OPTIONS}
            required
            searchable={false}
            onChange={this.handleChangeTalentType}
          />
          {isEdit &&
            <Field
              label='Status'
              name='status'
              component={SelectField}
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
            maxLength={
              talentConstants.TALENT_CONSTRAINT.firstNames.length.maximum
            }
          />
          <Field
            label='Last Name / Group Name'
            name='lastName'
            component={TextField}
            required
            forceSingleLine
            maxLength={
              talentConstants.TALENT_CONSTRAINT.lastName.length.maximum
            }
          />
        </FormRow>
        <FormRow>
          <Field
            label='Common Role'
            name='commonRole'
            component={TextField}
            required
            forceSingleLine
            maxLength={
              talentConstants.TALENT_CONSTRAINT.commonRole.length.maximum
            }
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
            maxLength={talentConstants.TALENT_CONSTRAINT.weSay.length.maximum}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Links'
            name='links'
            component={LinksField}
            onAddLink={this.handleAddLink}
            onDeleteLink={this.handleDeleteLink}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Images'
            entityType={entityConstants.ENTITY_TYPE_TALENT}
            name='images'
            component={ImagesField}
            showModal={_.noop}
            onAddImage={this.handleAddImage}
            onUpdateImage={this.handleUpdateImage}
            onSetMainImage={this.handleSetMainImage}
            onDeleteImage={this.handleDeleteImage}
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
  talentTypeValue: PropTypes.string.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.any,
  handleSubmit: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
}

const WrappedEditTalentForm = reduxForm({
  form: talentConstants.EDIT_TALENT_FORM_NAME,
  enableReinitialize: true
})(EditTalentForm)

const selector = formValueSelector(talentConstants.EDIT_TALENT_FORM_NAME)

export default connect(
  /* istanbul ignore next */
  state => ({
    talentTypeValue: selector(state, 'talentType')
  })
)(WrappedEditTalentForm)
