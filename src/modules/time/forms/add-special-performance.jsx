import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import FormRow from '_src/components/form/row'
import FormError from '_src/components/form/error'
import SelectField from '_src/components/select/field'
import SubFormButtons from '_src/components/form/sub-form-buttons'
import DatepickerField from '_src/components/datepicker/field'
import * as dateConstants from '_src/constants/date'
import * as timeConstants from '../constants'
import {
  selectors as tagSelectors,
  constants as tagConstants
} from '_src/modules/tag'

export const AddSpecialPerformanceForm = ({
  pristine,
  submitting,
  handleSubmit,
  error,
  minDate,
  maxDate,
  reset,
  audienceTagsOptions
}) => (
  <div>
    <FormRow>
      <Field
        label='Date'
        name='date'
        htmlId='date'
        dateFormat={dateConstants.DATE_FORMAT}
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
        required
      />
    </FormRow>
    <FormRow>
      <Field
        label='Audience Tags'
        name='audienceTags'
        component={SelectField}
        options={audienceTagsOptions}
        required
        searchable={false}
        multi
        valueKey='id'
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

AddSpecialPerformanceForm.propTypes = {
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.any,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  audienceTagsOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired
}

export default connect(
  /* istanbul ignore next */
  state => ({
    audienceTagsOptions: tagSelectors.getTagsForType(
      state,
      tagConstants.TAG_TYPE_AUDIENCE
    )
  })
)(
  reduxForm({
    form: timeConstants.ADD_SPECIAL_PERFORMANCE_FORM_NAME,
    initialValues: {
      date: '',
      at: '',
      audienceTags: ''
    }
  })(AddSpecialPerformanceForm)
)
