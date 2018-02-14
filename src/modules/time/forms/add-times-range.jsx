import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'

import FormRow from '_src/components/form/row'
import FormError from '_src/components/form/error'
import SubFormButtons from '_src/components/form/sub-form-buttons'
import DatepickerField from '_src/components/datepicker/field'
import TextField from '_src/components/text/field'
import * as dateConstants from '_src/constants/date'
import * as timeConstants from '_src/modules/time/constants'

export const AddTimesRangeForm = ({
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
        label='Date From'
        name='dateFrom'
        dateFormat={dateConstants.DATE_FORMAT}
        htmlId='dateFrom'
        component={DatepickerField}
        minDate={minDate}
        maxDate={maxDate}
        required
        containerStyle={{ minWidth: '12rem' }}
      />
      <Field
        label='Date To'
        name='dateTo'
        dateFormat={dateConstants.DATE_FORMAT}
        htmlId='dateTo'
        component={DatepickerField}
        minDate={minDate}
        maxDate={maxDate}
        required
        containerStyle={{ minWidth: '12rem' }}
      />
      <Field
        label='Label'
        name='label'
        htmlId='label'
        component={TextField}
        required={false}
        maxLength={20}
        autos={false}
        forceSingleLine
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

AddTimesRangeForm.propTypes = {
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
  form: timeConstants.ADD_TIMES_RANGE_FORM_NAME,
  initialValues: {
    dateFrom: '',
    dateTo: '',
    label: ''
  }
})(AddTimesRangeForm)