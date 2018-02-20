import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'

import FormRow from '_src/shared/components/form/row'
import FormError from '_src/shared/components/form/error'
import SubFormButtons from '_src/shared/components/form/sub-form-buttons'
import DatepickerField from '_src/shared/components/datepicker/field'
import SelectField from '_src/shared/components/select/field'
import * as globalConstants from '_src/shared/constants'
import * as timeConstants from '../constants'

export const AddPerformanceClosureForm = ({
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
        dateFormat={globalConstants.DATE_FORMAT}
        htmlId='date'
        component={DatepickerField}
        minDate={minDate}
        maxDate={maxDate}
        required
        containerStyle={{ minWidth: '12rem' }}
      />
      <Field
        label='At'
        name='at'
        component={SelectField}
        options={timeConstants.TIME_OF_DAY_DROPDOWN_OPTIONS}
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

AddPerformanceClosureForm.propTypes = {
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
  form: timeConstants.ADD_PERFORMANCE_CLOSURE_FORM_NAME,
  initialValues: {
    date: '',
    at: ''
  }
})(AddPerformanceClosureForm)
