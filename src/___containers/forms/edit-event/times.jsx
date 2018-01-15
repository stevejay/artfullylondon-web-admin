import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { bindActionCreators } from 'redux'
import Form from '_src/components/form'
import FormRow from '_src/components/form/row'
import FormButtons from '_src/components/form/buttons'
import Divider from '_src/components/divider'
import FormError from '_src/components/form/error'
import CheckboxField from '_src/components/checkbox/field'
import TimesField from '_src/components/times/field'
import AddOpeningTimeForm from '_src/containers/forms/add-opening-time'
import AddAdditionalOpeningTimeForm
  from '_src/containers/forms/add-additional-opening-time'
import AddSpecialOpeningTimeForm
  from '_src/containers/forms/add-special-opening-time'
import AddOpeningTimeClosureForm
  from '_src/containers/forms/add-opening-time-closure'
import AddPerformanceForm from '_src/containers/forms/add-performance'
import AddAdditionalPerformanceForm
  from '_src/containers/forms/add-additional-performance'
import AddSpecialPerformanceForm
  from '_src/containers/forms/add-special-performance'
import AddPerformanceClosureForm
  from '_src/containers/forms/add-performance-closure'
import DayAndTimePeriodEntry
  from '_src/components/time/day-and-time-period-entry'
import DateAndTimePeriodEntry
  from '_src/components/time/date-and-time-period-entry'
import AddTimesRangeForm from '_src/containers/forms/add-times-range'
import DateAndTimeEntry from '_src/components/time/date-and-time-entry'
import DayAndTimeEntry from '_src/components/time/day-and-time-entry'
import TimesRangeEntry from '_src/components/time/times-range-entry'
import {
  openingTimeConstraint,
  performanceConstraint,
  additionalOpeningTimeConstraint,
  additionalPerformanceConstraint,
  specialOpeningTimeConstraint,
  specialPerformanceConstraint,
  openingTimeClosureConstraint,
  performanceClosureConstraint,
  timesRangeConstraint
} from '_src/constants/time-constraints'
import { showModal } from '_src/actions/modal'
import { EDIT_EVENT_TIMES_FORM_NAME } from '_src/constants/form'
import * as timeActions from '_src/actions/time'
import * as timeLib from '_src/lib/time'

export class EditEventTimesForm extends React.Component {
  render () {
    const {
      handleSubmit,
      submitting,
      error,
      isEdit,
      onCancel,
      previousPage,
      eventType,
      dateFrom,
      dateTo,
      useVenueOpeningTimesValue,
      occurrenceType,
      showModal,
      initialValues,
      timeActions,
      audienceTags,
      timesRanges
    } = this.props

    const displayFlags = timeLib.getEventTimesFormDisplayFlags(
      eventType,
      occurrenceType,
      dateFrom,
      dateTo,
      initialValues.venue,
      useVenueOpeningTimesValue
    )

    const timesRangesOptions = timeLib.getTimesRangesOptions(timesRanges)

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
              constraint={timesRangeConstraint}
              parentFormName={EDIT_EVENT_TIMES_FORM_NAME}
              minDate={dateFrom}
              maxDate={dateTo}
              showModal={showModal}
              onSubmit={timeActions.addTimesRange}
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
              constraint={additionalOpeningTimeConstraint}
              parentFormName={EDIT_EVENT_TIMES_FORM_NAME}
              minDate={dateFrom}
              maxDate={dateTo}
              showModal={showModal}
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
              constraint={openingTimeConstraint}
              parentFormName={EDIT_EVENT_TIMES_FORM_NAME}
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
              constraint={additionalOpeningTimeConstraint}
              parentFormName={EDIT_EVENT_TIMES_FORM_NAME}
              minDate={dateFrom}
              maxDate={dateTo}
              showModal={showModal}
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
              constraint={additionalPerformanceConstraint}
              parentFormName={EDIT_EVENT_TIMES_FORM_NAME}
              minDate={dateFrom}
              maxDate={dateTo}
              showModal={showModal}
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
              constraint={performanceConstraint}
              parentFormName={EDIT_EVENT_TIMES_FORM_NAME}
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
              constraint={additionalPerformanceConstraint}
              parentFormName={EDIT_EVENT_TIMES_FORM_NAME}
              minDate={dateFrom}
              maxDate={dateTo}
              showModal={showModal}
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
              constraint={specialOpeningTimeConstraint}
              parentFormName={EDIT_EVENT_TIMES_FORM_NAME}
              minDate={dateFrom}
              maxDate={dateTo}
              audienceTags={audienceTags}
              showModal={showModal}
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
              constraint={specialPerformanceConstraint}
              parentFormName={EDIT_EVENT_TIMES_FORM_NAME}
              minDate={dateFrom}
              maxDate={dateTo}
              audienceTags={audienceTags}
              showModal={showModal}
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
              constraint={openingTimeClosureConstraint}
              parentFormName={EDIT_EVENT_TIMES_FORM_NAME}
              minDate={dateFrom}
              maxDate={dateTo}
              showModal={showModal}
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
              constraint={performanceClosureConstraint}
              parentFormName={EDIT_EVENT_TIMES_FORM_NAME}
              minDate={dateFrom}
              maxDate={dateTo}
              showModal={showModal}
              onSubmit={timeActions.addPerformanceClosure}
            />
          </FormRow>}
        <Divider />
        <FormError error={error} />
        <FormButtons
          submitLabel='Next'
          submitting={submitting}
          onCancel={isEdit ? onCancel : null}
          onPrevious={previousPage}
        />
      </Form>
    )
  }
}

EditEventTimesForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  isEdit: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.any,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  useVenueOpeningTimesValue: PropTypes.bool,
  eventType: PropTypes.string.isRequired,
  occurrenceType: PropTypes.string.isRequired,
  dateFrom: PropTypes.string,
  dateTo: PropTypes.string,
  audienceTags: PropTypes.array.isRequired,
  timesRanges: PropTypes.array,
  showModal: PropTypes.func.isRequired,
  timeActions: PropTypes.object.isRequired
}

const WrappedEditEventTimesForm = reduxForm({
  form: EDIT_EVENT_TIMES_FORM_NAME
})(EditEventTimesForm)

const selector = formValueSelector(EDIT_EVENT_TIMES_FORM_NAME)

export default connect(
  state => ({
    initialValues: state.eventForEdit.entity,
    isEdit: !!state.eventForEdit.entityId,
    useVenueOpeningTimesValue: selector(state, 'useVenueOpeningTimes'),
    eventType: state.eventForEdit.entity.eventType,
    occurrenceType: state.eventForEdit.entity.occurrenceType,
    dateFrom: state.eventForEdit.entity.dateFrom,
    dateTo: state.eventForEdit.entity.dateTo,
    audienceTags: state.tag.audience,
    timesRanges: selector(state, 'timesRanges')
  }),
  dispatch => ({
    showModal: bindActionCreators(showModal, dispatch),
    timeActions: bindActionCreators(timeActions, dispatch)
  })
)(WrappedEditEventTimesForm)
