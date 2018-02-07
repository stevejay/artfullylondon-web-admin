import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import FormRow from '_src/components/form/row'
import TextField from '_src/components/text/field'
import DropdownField from '_src/components/dropdown/field'
import SubFormButtons from '_src/components/form/sub-form-buttons'
import FieldBorder from '_src/components/field/border'
import { ACTIVE_STATUS } from '_src/constants/entity'
import {
  TALENT_TYPES_DROPDOWN_OPTIONS,
  TALENT_TYPE_INDIVIDUAL,
  TALENT_TYPE_GROUP
} from '_src/constants/talent'
import { isIndividualTalent } from '_src/lib/talent'
import { CREATE_TALENT_FORM_NAME } from '_src/constants/form'

export class CreateTalentForm extends React.Component {
  handleChangeTalentType = (_, newValue) => {
    if (newValue === TALENT_TYPE_GROUP) {
      this.props.change('firstNames', '')
    }
  }
  render () {
    const {
      submitting,
      talentTypeValue,
      handleSubmit,
      constraint,
      pristine,
      reset
    } = this.props

    const isGroup = !isIndividualTalent(talentTypeValue)

    return (
      <FieldBorder style={{ marginBottom: '1.5rem' }}>
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
        <SubFormButtons
          submitting={submitting}
          pristine={pristine}
          onSubmit={handleSubmit}
          onReset={reset}
        />
      </FieldBorder>
    )
  }
}

CreateTalentForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  talentTypeValue: PropTypes.string,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.any,
  reset: PropTypes.func.isRequired,
  constraint: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired
}

const WrappedCreateTalentForm = reduxForm({
  form: CREATE_TALENT_FORM_NAME
})(CreateTalentForm)

const selector = formValueSelector(CREATE_TALENT_FORM_NAME)

export default connect(state => ({
  initialValues: {
    status: ACTIVE_STATUS,
    firstNames: '',
    lastName: '',
    talentType: TALENT_TYPE_INDIVIDUAL,
    commonRole: '',
    links: [],
    images: [],
    weSay: '',
    version: 0
  },
  talentTypeValue: selector(state, 'talentType')
}))(WrappedCreateTalentForm)
