import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'

import Form from '_src/shared/components/form'
import FormRow from '_src/shared/components/form/row'
import FormError from '_src/shared/components/form/error'
import FormButtons from '_src/shared/components/form/buttons'
import Divider from '_src/shared/components/divider'
import CheckboxField from '_src/shared/components/checkbox/field'
import {
  TimesField,
  AddTimesRangeForm,
  AddAdditionalOpeningTimeForm,
  AddOpeningTimeForm,
  AddAdditionalPerformanceForm,
  AddPerformanceForm,
  AddSpecialOpeningTimeForm,
  AddSpecialPerformanceForm,
  AddOpeningTimeClosureForm,
  AddPerformanceClosureForm,
  TimesRangeEntry,
  DateAndTimePeriodEntry,
  DayAndTimePeriodEntry,
  DateAndTimeEntry,
  DayAndTimeEntry,
  constraints as timeConstraints,
  actions as timeActions,
  getTimesRangesOptions
} from '_src/modules/time'
import * as timeLib from '_src/shared/lib/time'
import * as eventConstants from '../constants'

export class EditEventTimesForm extends React.Component {
  render () {
    const {
      initialValues,
      useVenueOpeningTimesValue,
      timesRangesValue,
      handleSubmit,
      error,
      submitting,
      isEdit,
      onCancel,
      onPreviousPage
    } = this.props

    const { eventType, occurrenceType, dateFrom, dateTo, venue } = initialValues

    const displayFlags = timeLib.getEventTimesFormDisplayFlags(
      eventType,
      occurrenceType,
      dateFrom,
      dateTo,
      venue,
      useVenueOpeningTimesValue
    )

    // TODO performance issue here:
    const timesRangesOptions = getTimesRangesOptions(timesRangesValue)

    return (
      <Form onSubmit={handleSubmit}>
        {displayFlags.showUseVenueTimesOption &&
          <FormRow>
            <Field
              label='Venue Opening Times'
              name='useVenueOpeningTimes'
              component={CheckboxField}
              checkboxLabel="Use the venue's opening times"
            />
          </FormRow>}
        {displayFlags.showUseVenueTimesOption && <Divider />}
        {displayFlags.showTimesRanges &&
          <FormRow>
            <Field
              label='Times Ranges'
              name='timesRanges'
              component={TimesField}
              formComponent={AddTimesRangeForm}
              itemComponent={TimesRangeEntry}
              constraint={timeConstraints.TIMES_RANGE_CONSTRAINT}
              parentFormName={eventConstants.EDIT_EVENT_TIMES_FORM_NAME}
              minDate={dateFrom}
              maxDate={dateTo}
              onSubmit={timeActions.addTimesRange}
              timesRangesOptions={timesRangesOptions}
            />
          </FormRow>}
        {displayFlags.showAdditionalOpeningTimesAsOpeningTimes &&
          <FormRow>
            <Field
              label='Opening Times'
              name='additionalOpeningTimes'
              component={TimesField}
              formComponent={AddAdditionalOpeningTimeForm}
              itemComponent={DateAndTimePeriodEntry}
              constraint={timeConstraints.ADDITIONAL_OPENING_TIME_CONSTRAINT}
              parentFormName={eventConstants.EDIT_EVENT_TIMES_FORM_NAME}
              minDate={dateFrom}
              maxDate={dateTo}
              onSubmit={timeActions.addAdditionalOpeningTime}
            />
          </FormRow>}
        {displayFlags.showOpeningTimes &&
          <FormRow>
            <Field
              label='Opening Times'
              name='openingTimes'
              component={TimesField}
              formComponent={AddOpeningTimeForm}
              itemComponent={DayAndTimePeriodEntry}
              constraint={timeConstraints.OPENING_TIME_CONSTRAINT}
              parentFormName={eventConstants.EDIT_EVENT_TIMES_FORM_NAME}
              timesRangesOptions={timesRangesOptions}
              onSubmit={timeActions.addOpeningTime}
            />
          </FormRow>}
        {displayFlags.showAdditionalOpeningTimes &&
          <FormRow>
            <Field
              label='Additional Opening Times'
              name='additionalOpeningTimes'
              component={TimesField}
              formComponent={AddAdditionalOpeningTimeForm}
              itemComponent={DateAndTimePeriodEntry}
              constraint={timeConstraints.ADDITIONAL_OPENING_TIME_CONSTRAINT}
              parentFormName={eventConstants.EDIT_EVENT_TIMES_FORM_NAME}
              minDate={dateFrom}
              maxDate={dateTo}
              onSubmit={timeActions.addAdditionalOpeningTime}
            />
          </FormRow>}
        {displayFlags.showAdditionalPerformancesAsPerformances &&
          <FormRow>
            <Field
              label='Performances'
              name='additionalPerformances'
              component={TimesField}
              formComponent={AddAdditionalPerformanceForm}
              itemComponent={DateAndTimeEntry}
              constraint={timeConstraints.ADDITIONAL_PERFORMANCE_CONSTRAINT}
              parentFormName={eventConstants.EDIT_EVENT_TIMES_FORM_NAME}
              minDate={dateFrom}
              maxDate={dateTo}
              onSubmit={timeActions.addAdditionalPerformance}
            />
          </FormRow>}
        {displayFlags.showPerformances &&
          <FormRow>
            <Field
              label='Performance Times'
              name='performances'
              component={TimesField}
              formComponent={AddPerformanceForm}
              itemComponent={DayAndTimeEntry}
              constraint={timeConstraints.PERFORMANCE_CONSTRAINT}
              parentFormName={eventConstants.EDIT_EVENT_TIMES_FORM_NAME}
              timesRangesOptions={timesRangesOptions}
              onSubmit={timeActions.addPerformance}
            />
          </FormRow>}
        {displayFlags.showAdditionalPerformances &&
          <FormRow>
            <Field
              label='Additional Performances'
              name='additionalPerformances'
              component={TimesField}
              formComponent={AddAdditionalPerformanceForm}
              itemComponent={DateAndTimeEntry}
              constraint={timeConstraints.ADDITIONAL_PERFORMANCE_CONSTRAINT}
              parentFormName={eventConstants.EDIT_EVENT_TIMES_FORM_NAME}
              minDate={dateFrom}
              maxDate={dateTo}
              onSubmit={timeActions.addAdditionalPerformance}
            />
          </FormRow>}
        {displayFlags.showSpecialOpeningTimes &&
          <FormRow>
            <Field
              label='Special Openings'
              name='specialOpeningTimes'
              component={TimesField}
              formComponent={AddSpecialOpeningTimeForm}
              itemComponent={DateAndTimePeriodEntry}
              constraint={timeConstraints.SPECIAL_OPENING_TIME_CONSTRAINT}
              parentFormName={eventConstants.EDIT_EVENT_TIMES_FORM_NAME}
              minDate={dateFrom}
              maxDate={dateTo}
              onSubmit={timeActions.addSpecialOpeningTime}
            />
          </FormRow>}
        {displayFlags.showSpecialPerformances &&
          <FormRow>
            <Field
              label='Special Performances'
              name='specialPerformances'
              component={TimesField}
              formComponent={AddSpecialPerformanceForm}
              itemComponent={DateAndTimeEntry}
              constraint={timeConstraints.SPECIAL_PERFORMANCES_CONSTRAINT}
              parentFormName={eventConstants.EDIT_EVENT_TIMES_FORM_NAME}
              minDate={dateFrom}
              maxDate={dateTo}
              onSubmit={timeActions.addSpecialPerformance}
            />
          </FormRow>}
        {displayFlags.showOpeningTimesClosures &&
          <FormRow>
            <Field
              label='Closures'
              name='openingTimesClosures'
              component={TimesField}
              formComponent={AddOpeningTimeClosureForm}
              itemComponent={DateAndTimePeriodEntry}
              constraint={timeConstraints.OPENING_TIME_CLOSURE_CONSTRAINT}
              parentFormName={eventConstants.EDIT_EVENT_TIMES_FORM_NAME}
              minDate={dateFrom}
              maxDate={dateTo}
              onSubmit={timeActions.addOpeningTimeClosure}
            />
          </FormRow>}
        {displayFlags.showPerformancesClosures &&
          <FormRow>
            <Field
              label='Closures'
              name='performancesClosures'
              component={TimesField}
              formComponent={AddPerformanceClosureForm}
              itemComponent={DateAndTimeEntry}
              constraint={timeConstraints.PERFORMANCE_CLOSURE_CONSTRAINT}
              parentFormName={eventConstants.EDIT_EVENT_TIMES_FORM_NAME}
              minDate={dateFrom}
              maxDate={dateTo}
              onSubmit={timeActions.addPerformanceClosure}
            />
          </FormRow>}
        <Divider />
        <FormError error={error} />
        <FormButtons
          submitLabel='Next'
          submitting={submitting}
          onCancel={isEdit ? onCancel : null}
          onPrevious={onPreviousPage}
        />
      </Form>
    )
  }
}

EditEventTimesForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  isEdit: PropTypes.bool.isRequired,
  useVenueOpeningTimesValue: PropTypes.bool,
  timesRangesValue: PropTypes.array,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.any,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onPreviousPage: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
}

const WrappedEditEventTimesForm = reduxForm({
  form: eventConstants.EDIT_EVENT_TIMES_FORM_NAME,
  enableReinitialize: true
})(EditEventTimesForm)

const selector = formValueSelector(eventConstants.EDIT_EVENT_TIMES_FORM_NAME)

export default connect(
  /* istanbul ignore next */
  state => ({
    useVenueOpeningTimesValue: selector(state, 'useVenueOpeningTimes'),
    timesRangesValue: selector(state, 'timesRanges')
  })
)(WrappedEditEventTimesForm)
