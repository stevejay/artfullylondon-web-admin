import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FormRow from '_src/components/form/row'
import FormError from '_src/components/form/error'
import SubFormButtons from '_src/components/form/sub-form-buttons'
import DatepickerField from '_src/components/datepicker/field'
import DropdownField from '_src/components/dropdown/field'
import { DATE_FORMAT, TIME_OF_DAY_DROPDOWN_OPTIONS } from '_src/constants/time'
import { showModal } from '_src/actions/modal'
import { ADD_OPENING_TIME_CLOSURE_FORM_NAME } from '_src/constants/form'

export const AddOpeningTimeClosureForm = ({
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
        label='Date'
        name='date'
        dateFormat={DATE_FORMAT}
        htmlId='date'
        component={DatepickerField}
        minDate={minDate}
        maxDate={maxDate}
        required
        showModal={showModal}
        containerStyle={{ minWidth: '12rem' }}
      />
      <Field
        label='From'
        name='from'
        component={DropdownField}
        options={TIME_OF_DAY_DROPDOWN_OPTIONS}
      />
      <Field
        label='To'
        name='to'
        component={DropdownField}
        options={TIME_OF_DAY_DROPDOWN_OPTIONS}
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

AddOpeningTimeClosureForm.propTypes = {
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
      date: '',
      from: '',
      to: ''
    }
  }),
  dispatch => ({
    showModal: bindActionCreators(showModal, dispatch)
  })
)(
  reduxForm({
    form: ADD_OPENING_TIME_CLOSURE_FORM_NAME
  })(AddOpeningTimeClosureForm)
)
