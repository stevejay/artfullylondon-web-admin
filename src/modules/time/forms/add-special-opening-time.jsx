import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import FormRow from '_src/shared/components/form/row'
import FormError from '_src/shared/components/form/error'
import SubFormButtons from '_src/shared/components/form/sub-form-buttons'
import SelectField from '_src/shared/components/select/field'
import DatepickerField from '_src/shared/components/datepicker/field'
import tagType from '_src/domain/types/tag-type'
import * as globalConstants from '_src/shared/constants'
import * as timeConstants from '../constants'
import { selectors as tagSelectors } from '_src/modules/tag'

export const AddSpecialOpeningTimeForm = ({
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
        component={DatepickerField}
        dateFormat={globalConstants.DATE_FORMAT}
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

AddSpecialOpeningTimeForm.propTypes = {
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
    form: timeConstants.ADD_SPECIAL_OPENING_TIME_FORM_NAME,
    initialValues: {
      date: '',
      from: '',
      to: '',
      audienceTags: ''
    }
  })(AddSpecialOpeningTimeForm)
)
