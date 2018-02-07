import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import FormRow from '_src/components/form/row'
import FormError from '_src/components/form/error'
import DropdownField from '_src/components/dropdown/field'
import SubFormButtons from '_src/components/form/sub-form-buttons'
import { ADD_OPENING_TIME_FORM_NAME } from '_src/constants/form'
import {
  TIME_OF_DAY_DROPDOWN_OPTIONS,
  DAYS_OF_WEEK_DROPDOWN_OPTIONS
} from '_src/constants/time'

export const AddOpeningTimeForm = ({
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
        options={DAYS_OF_WEEK_DROPDOWN_OPTIONS}
        required
        searchable={false}
        containerStyle={{ flexGrow: 0, minWidth: '12rem' }}
      />
      <Field
        label='From'
        name='from'
        component={DropdownField}
        options={TIME_OF_DAY_DROPDOWN_OPTIONS}
        required
      />
      <Field
        label='To'
        name='to'
        component={DropdownField}
        options={TIME_OF_DAY_DROPDOWN_OPTIONS}
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

AddOpeningTimeForm.propTypes = {
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  timesRangesOptions: PropTypes.array,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.any
}

export default reduxForm({
  form: ADD_OPENING_TIME_FORM_NAME
})(AddOpeningTimeForm)
