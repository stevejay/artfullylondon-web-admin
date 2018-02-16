import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'

import FormRow from '_src/components/form/row'
import FormError from '_src/components/form/error'
import SubFormButtons from '_src/components/form/sub-form-buttons'
import SelectField from '_src/components/select/field'
import DatepickerField from '_src/components/datepicker/field'
import * as dateConstants from '_src/constants/date'
import * as timeConstants from '../constants'

export const AddAdditionalOpeningTimeForm = ({
  pristine,
  submitting,
  handleSubmit,
  error,
  minDate,
  maxDate,
  reset
}) => (
  <div>
    <FormRow>
      <Field
        label='Date'
        name='date'
        component={DatepickerField}
        dateFormat={dateConstants.DATE_FORMAT}
        htmlId='date'
        minDate={minDate}
        maxDate={maxDate}
        required
        containerStyle={{ minWidth: '12rem' }}
      />
      <Field
        label='From'
        name='from'
        component={SelectField}
        options={timeConstants.TIME_OF_DAY_DROPDOWN_OPTIONS}
        required
      />
      <Field
        label='To'
        name='to'
        component={SelectField}
        options={timeConstants.TIME_OF_DAY_DROPDOWN_OPTIONS}
        required
      />
    </FormRow>
    <FormError error={error} hideGenericErrorMessages />
    <SubFormButtons
      submitting={submitting}
      pristine={pristine}
      onSubmit={handleSubmit}
      onReset={reset}
    />
  </div>
)

AddAdditionalOpeningTimeForm.propTypes = {
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.any,
  minDate: PropTypes.string,
  maxDate: PropTypes.string
}

export default reduxForm({
  form: timeConstants.ADD_ADDITIONAL_OPENING_TIME_FORM_NAME,
  initialValues: {
    date: '',
    from: '',
    to: ''
  }
})(AddAdditionalOpeningTimeForm)
