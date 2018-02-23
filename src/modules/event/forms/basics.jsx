import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import GbpIcon from 'react-icons/lib/fa/gbp'

import Form from '_src/shared/components/form'
import FormRow from '_src/shared/components/form/row'
import FormError from '_src/shared/components/form/error'
import FormButtons from '_src/shared/components/form/buttons'
import Divider from '_src/shared/components/divider'
import TextField from '_src/shared/components/text/field'
import DatepickerField from '_src/shared/components/datepicker/field'
import SelectField from '_src/shared/components/select/field'
import HtmlTextField from '_src/shared/components/html-text/field'
import EntitySelectorField from '../components/entity-selector-field'
import { LinksField } from '_src/modules/link'
import occurrenceType from '_src/domain/types/occurrence-type'
import costType from '_src/domain/types/cost-type'
import bookingType from '_src/domain/types/booking-type'
import entityType from '_src/domain/types/entity-type'
import * as eventConstants from '../constants'
import * as globalConstants from '_src/shared/constants'
import * as eventLib from '_src/shared/lib/event'
import * as eventNormaliseLib from '../lib/normalise'
import { BASIC_CONSTRAINT } from '../constants/constraints'

export class EditEventBasicsForm extends React.Component {
  handleChangeOccurrenceType = (_, newValue) => {
    if (newValue === occurrenceType.CONTINUOUS) {
      this.props.change('dateFrom', '')
      this.props.change('dateTo', '')
    }
  }
  handleChangeDateFrom = (_, newValue) => {
    if (this.props.occurrenceTypeValue === occurrenceType.ONETIME) {
      this.props.change('dateTo', newValue)
    }
  }
  handleChangeDateTo = (_, newValue) => {
    if (this.props.occurrenceTypeValue === occurrenceType.ONETIME) {
      this.props.change('dateFrom', newValue)
    }
  }
  handleChangeCostType = (_, newValue) => {
    if (newValue === costType.FREE || newValue === costType.UNKNOWN) {
      this.props.change('costFrom', '')
      this.props.change('costTo', '')
    }
  }
  handleChangeBookingType = (_, newValue) => {
    if (newValue === bookingType.NOT_REQUIRED) {
      this.props.change('bookingOpens', '')
    }
  }
  handleGetEventSeries = id => {
    console.log('handleGetEventSeries', id)
  }
  render () {
    const {
      costTypeValue,
      bookingTypeValue,
      occurrenceTypeValue,
      eventTypeValue,
      handleSubmit,
      error,
      submitting,
      isEdit,
      onCancel
    } = this.props

    const showCost = eventLib.eventIsPaid(costTypeValue)
    const showBookingOpens = eventLib.bookingRequired(bookingTypeValue)

    const showOccurrenceRange = eventLib.occurrenceHasDateRange(
      occurrenceTypeValue
    )

    let occurrenceTypeOptions = []

    if (eventTypeValue) {
      occurrenceTypeOptions = eventLib.eventIsPerformance(eventTypeValue)
        ? eventConstants.PERFORMANCE_OCCURRENCE_TYPE_DROPDOWN_OPTIONS
        : eventConstants.EXHIBITION_OCCURRENCE_TYPE_DROPDOWN_OPTIONS
    }

    // entityDetailsUrlTemplate='/event-series/{id}'
    // entityDetailsFormatter={eventSeriesDetailsFormatter}
    // entitySearchLabel='Search for an Event Series'

    return (
      <Form onSubmit={handleSubmit}>
        <FormRow>
          <Field
            label='Name'
            name='name'
            required
            component={TextField}
            maxLength={BASIC_CONSTRAINT.name.length.maximum}
          />
        </FormRow>

        <FormRow>
          <Field
            label='Event Series'
            name='eventSeries'
            component={EntitySelectorField}
            entityType={entityType.EVENT_SERIES}
            getSubEntity={this.handleGetEventSeries}
            parentFormName={eventConstants.EDIT_EVENT_BASICS_FORM_NAME}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Duration'
            name='duration'
            component={SelectField}
            options={eventConstants.DURATION_DROPDOWN_OPTIONS}
          />
          <Field
            label='Event Rating'
            name='rating'
            component={SelectField}
            options={eventConstants.RATING_DROPDOWN_OPTIONS}
          />
          <Field
            label='Minimum Age'
            name='minAge'
            component={SelectField}
            options={eventConstants.MIN_AGE_DROPDOWN_OPTIONS}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Summary of Event'
            name='summary'
            component={TextField}
            required
            maxLength={BASIC_CONSTRAINT.summary.length.maximum}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Description of Event'
            name='description'
            component={HtmlTextField}
            maxLength={5000}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Description Credit'
            name='descriptionCredit'
            component={TextField}
            forceSingleLine
            maxLength={BASIC_CONSTRAINT.descriptionCredit.length.maximum}
          />
        </FormRow>
        <FormRow>
          <Field
            label='We Say'
            name='weSay'
            component={TextField}
            maxLength={BASIC_CONSTRAINT.weSay.length.maximum}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Cost Type'
            name='costType'
            component={SelectField}
            options={eventConstants.COST_TYPE_DROPDOWN_OPTIONS}
            required
            searchable={false}
            onChange={this.handleChangeCostType}
            containerStyle={{ minWidth: '10rem' }}
          />
          <Field
            label='Cost From'
            name='costFrom'
            normalize={eventNormaliseLib.normaliseMoney}
            required
            disabled={!showCost}
            component={TextField}
            remainingChars={false}
            icon={GbpIcon}
            maxLength={BASIC_CONSTRAINT.costFrom.length.maximum}
          />
          <Field
            label='Cost To'
            name='costTo'
            required
            disabled={!showCost}
            component={TextField}
            remainingChars={false}
            icon={GbpIcon}
            maxLength={BASIC_CONSTRAINT.costTo.length.maximum}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Booking Type'
            name='bookingType'
            component={SelectField}
            options={eventConstants.BOOKING_TYPE_DROPDOWN_OPTIONS}
            required
            searchable={false}
            onChange={this.handleChangeBookingType}
            containerStyle={{ minWidth: '25rem' }}
          />
          <Field
            label='Booking Opens'
            name='bookingOpens'
            htmlId='bookingOpens'
            dateFormat={globalConstants.DATE_FORMAT}
            component={DatepickerField}
            disabled={!showBookingOpens}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Links'
            parentFormName={eventConstants.EDIT_EVENT_BASICS_FORM_NAME}
            name='links'
            component={LinksField}
          />
        </FormRow>
        <Divider />
        <FormError error={error} />
        <FormButtons
          submitLabel='Next'
          submitting={submitting}
          onCancel={isEdit ? onCancel : null}
        />
      </Form>
    )
  }
}

EditEventBasicsForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  isEdit: PropTypes.bool.isRequired,
  eventTypeValue: PropTypes.string,
  bookingTypeValue: PropTypes.string,
  costTypeValue: PropTypes.string,
  dateFromValue: PropTypes.string,
  occurrenceTypeValue: PropTypes.string,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.any,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
}

const WrappedEditEventBasicsForm = reduxForm({
  form: eventConstants.EDIT_EVENT_BASICS_FORM_NAME,
  enableReinitialize: true
})(EditEventBasicsForm)

const selector = formValueSelector(eventConstants.EDIT_EVENT_BASICS_FORM_NAME)

export default connect(state => ({
  eventTypeValue: selector(state, 'eventType'),
  bookingTypeValue: selector(state, 'bookingType'),
  costTypeValue: selector(state, 'costType'),
  dateFromValue: selector(state, 'dateFrom'),
  occurrenceTypeValue: selector(state, 'occurrenceType')
}))(WrappedEditEventBasicsForm)
