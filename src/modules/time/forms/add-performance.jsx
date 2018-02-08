import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'

import FormRow from '_src/components/form/row'
import FormError from '_src/components/form/error'
import DropdownField from '_src/components/dropdown/field'
import SubFormButtons from '_src/components/form/sub-form-buttons'
import * as timeConstants from '_src/modules/time/constants'

export const AddPerformanceForm = ({
  pristine,
  submitting,
  handleSubmit,
  error,
  reset,
  timesRangesOptions
}) => (
  <div>
    <FormRow>
      <Field
        label='Day'
        name='day'
        component={DropdownField}
        options={timeConstants.DAYS_OF_WEEK_DROPDOWN_OPTIONS}
        required
        searchable={false}
        containerStyle={{ minWidth: '12rem' }}
      />
      <Field
        label='At'
        name='at'
        component={DropdownField}
        options={timeConstants.TIME_OF_DAY_DROPDOWN_OPTIONS}
        required
      />
      {timesRangesOptions &&
        !!timesRangesOptions.length &&
        <Field
          label='Times Range'
          name='timesRangeId'
          component={DropdownField}
          options={timesRangesOptions}
          required
        />}
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

AddPerformanceForm.propTypes = {
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  timesRangesOptions: PropTypes.array,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.any
}

export default reduxForm({
  form: timeConstants.ADD_PERFORMANCE_FORM_NAME
})(AddPerformanceForm)
