import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import FormRow from '_src/shared/components/form/row'
import FormError from '_src/shared/components/form/error'
import SelectField from '_src/shared/components/select/field'
import SubFormButtons from '_src/shared/components/form/sub-form-buttons'
import DatepickerField from '_src/shared/components/datepicker/field'
import * as globalConstants from '_src/shared/constants'
import tagType from '_src/domain/types/tag-type'
import * as timeConstants from '../constants'
import { selectors as tagSelectors } from '_src/modules/tag'

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
        dateFormat={globalConstants.DATE_FORMAT}
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
    audienceTagsOptions: tagSelectors.getTagsForType(state, tagType.AUDIENCE)
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
