import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'

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
import * as talentConstants from '../constants'
import { ImagesField } from '_src/modules/image'
import { LinksField } from '_src/modules/link'

export class EditTalentForm extends React.PureComponent {
  handleChangeTalentType = (_, newValue) => {
    if (newValue === talentDomainConstants.TALENT_TYPE_GROUP) {
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
            autos={false}
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
            autos={false}
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
            parentFormName={talentConstants.EDIT_TALENT_FORM_NAME}
            name='links'
            component={LinksField}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Images'
            parentFormName={talentConstants.EDIT_TALENT_FORM_NAME}
            entityType={entityConstants.ENTITY_TYPE_TALENT}
            name='images'
            component={ImagesField}
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
  change: PropTypes.func.isRequired
}

const WrappedEditTalentForm = reduxForm({
  form: talentConstants.EDIT_TALENT_FORM_NAME,
  enableReinitialize: true
})(EditTalentForm)

const selector = formValueSelector(talentConstants.EDIT_TALENT_FORM_NAME)

export default connect(
  /* istanbul ignore next */
  state => ({ talentTypeValue: selector(state, 'talentType') })
)(WrappedEditTalentForm)
