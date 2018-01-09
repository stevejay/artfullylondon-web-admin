import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FormRow from '_src/components/form/row'
import FormError from '_src/components/form/error'
import SubFormButtons from '_src/components/form/sub-form-buttons'
import DatepickerField from '_src/components/datepicker/field'
import TextField from '_src/components/text/field'
import { DATE_FORMAT } from '_src/constants/time'
import { showModal } from '_src/actions/modal'
import { ADD_TIMES_RANGE_FORM_NAME } from '_src/constants/form'

export const AddTimesRangeForm = ({
  pristine,
  submitting,
  handleSubmit,
  error,
  minDate,
  maxDate,
  showModal,
  reset
}) => (
  <div>
    <FormRow>
      <Field
        label='Date From'
        name='dateFrom'
        dateFormat={DATE_FORMAT}
        htmlId='dateFrom'
        component={DatepickerField}
        minDate={minDate}
        maxDate={maxDate}
        required
        showModal={showModal}
        containerStyle={{ minWidth: '12rem' }}
      />
      <Field
        label='Date To'
        name='dateTo'
        dateFormat={DATE_FORMAT}
        htmlId='dateTo'
        component={DatepickerField}
        minDate={minDate}
        maxDate={maxDate}
        required
        showModal={showModal}
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
  maxDate: PropTypes.string,
  showModal: PropTypes.func.isRequired
}

export default connect(
  () => ({
    initialValues: {
      dateFrom: '',
      dateTo: '',
      label: ''
    }
  }),
  dispatch => ({
    showModal: bindActionCreators(showModal, dispatch)
  })
)(
  reduxForm({
    form: ADD_TIMES_RANGE_FORM_NAME
  })(AddTimesRangeForm)
)
