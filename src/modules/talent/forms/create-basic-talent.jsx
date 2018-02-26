import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'

import Form from '_src/shared/components/form'
import FormRow from '_src/shared/components/form/row'
import TextField from '_src/shared/components/text/field'
import FormButtons from '_src/shared/components/form/buttons'
import Divider from '_src/shared/components/divider'
import SelectField from '_src/shared/components/select/field'
import * as talentConstants from '../constants'
import talentType from '_src/domain/types/talent-type'

export class CreateBasicTalentForm extends React.PureComponent {
  handleChangeTalentType = (_, newValue) => {
    if (newValue === talentType.GROUP) {
      this.props.change('firstNames', '')
    }
  }
  render () {
    const {
      submitting,
      talentTypeValue,
      handleSubmit,
      onCancel,
      className
    } = this.props

    const isGroup = talentTypeValue === talentType.GROUP

    return (
      <Form className={className} onSubmit={handleSubmit}>
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
        <Divider />
        <FormButtons
          submitLabel='Submit'
          submitting={submitting}
          onCancel={onCancel}
        />
      </Form>
    )
  }
}

CreateBasicTalentForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  className: PropTypes.string,
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
})(CreateBasicTalentForm)

const selector = formValueSelector(talentConstants.EDIT_TALENT_FORM_NAME)

export default connect(
  /* istanbul ignore next */
  state => ({ talentTypeValue: selector(state, 'talentType') })
)(WrappedEditTalentForm)
