import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import GBP from 'react-icons/lib/fa/gbp'
import Form from '_src/components/form'
import FormRow from '_src/components/form/row'
import FormButtons from '_src/components/form/buttons'
import Divider from '_src/components/divider'
import FormError from '_src/components/form/error'
import TextField from '_src/components/text/field'
import DropdownField from '_src/components/dropdown/field'
import DatepickerField from '_src/components/datepicker/field'
import { DATE_FORMAT } from '_src/constants/time'
import HtmlTextField from '_src/components/html-text/field'
import LinksField from '_src/components/links/field'
import { formatAddressForDisplay } from '_src/lib/venue'
import {
  ENTITY_TYPE_VENUE,
  ENTITY_TYPE_EVENT_SERIES
} from '_src/constants/entity'
import { eventIsPaid, eventIsPerformance } from '_src/lib/event'
import { bookingRequired, occurrenceTypeHasDateRange } from '_src/lib/event'
import {
  EVENT_TYPE_DROPDOWN_OPTIONS,
  COST_TYPE_DROPDOWN_OPTIONS,
  BOOKING_TYPE_DROPDOWN_OPTIONS,
  PERFORMANCE_OCCURRENCE_TYPE_DROPDOWN_OPTIONS,
  EXHIBITION_OCCURRENCE_TYPE_DROPDOWN_OPTIONS,
  OCCURRENCE_TYPE_CONTINUOUS,
  OCCURRENCE_TYPE_ONETIME,
  COST_TYPE_FREE,
  COST_TYPE_UNKNOWN,
  BOOKING_TYPE_NOT_REQUIRED
} from '_src/constants/event'
import {
  RATING_DROPDOWN_OPTIONS,
  MIN_AGE_DROPDOWN_OPTIONS
} from '_src/constants/event'
import { EDIT_EVENT_BASICS_FORM_NAME } from '_src/constants/form'
import { DURATION_DROPDOWN_OPTIONS } from '_src/constants/time'
import { getSubEntity } from '_src/actions/entity'
import { showModal } from '_src/actions/modal'
import * as linkActions from '_src/actions/link'
import EntitySelectorField from '_src/components/entity-selector/field'

function money (value) {
  return value.replace(/[^\d.]/g, '')
}

function venueDetailsFormatter (value) {
  return formatAddressForDisplay(value.address, value.postcode)
}

function eventSeriesDetailsFormatter (value) {
  return value.eventSeriesType
}

export class EditEventBasicsForm extends React.Component {
  handleChangeOccurrenceType = (_, newValue) => {
    if (newValue === OCCURRENCE_TYPE_CONTINUOUS) {
      this.props.change('dateFrom', '')
      this.props.change('dateTo', '')
    }
  }
  handleChangeDateFrom = (_, newValue) => {
    if (this.props.occurrenceTypeValue === OCCURRENCE_TYPE_ONETIME) {
      this.props.change('dateTo', newValue)
    }
  }
  handleChangeDateTo = (_, newValue) => {
    if (this.props.occurrenceTypeValue === OCCURRENCE_TYPE_ONETIME) {
      this.props.change('dateFrom', newValue)
    }
  }
  handleChangeCostType = (_, newValue) => {
    if (newValue === COST_TYPE_FREE || newValue === COST_TYPE_UNKNOWN) {
      this.props.change('costFrom', '')
      this.props.change('costTo', '')
    }
  }
  handleChangeBookingType = (_, newValue) => {
    if (newValue === BOOKING_TYPE_NOT_REQUIRED) {
      this.props.change('bookingOpens', '')
    }
  }
  render () {
    const {
      handleSubmit,
      error,
      isEdit,
      onCancel,
      submitting,
      constraint,
      validStatuses,
      costTypeValue,
      bookingTypeValue,
      occurrenceTypeValue,
      eventTypeValue,
      getSubEntity,
      showModal,
      dateFromValue,
      linkActions,
      getEventSeriesSubEntityInProgress,
      getVenueSubEntityInProgress
    } = this.props

    const showCost = eventIsPaid(costTypeValue)
    const showBookingOpens = bookingRequired(bookingTypeValue)
    const showOccurrenceRange = occurrenceTypeHasDateRange(occurrenceTypeValue)

    const occurrenceTypeOptions = !eventTypeValue
      ? []
      : eventIsPerformance(eventTypeValue)
        ? PERFORMANCE_OCCURRENCE_TYPE_DROPDOWN_OPTIONS
        : EXHIBITION_OCCURRENCE_TYPE_DROPDOWN_OPTIONS

    return (
      <Form onSubmit={handleSubmit}>
        <FormRow>
          <Field
            label='Name'
            name='name'
            required
            component={TextField}
            maxLength={constraint.name.length.maximum}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Event Type'
            name='eventType'
            component={DropdownField}
            options={EVENT_TYPE_DROPDOWN_OPTIONS}
            required
            searchable={false}
          />
          {isEdit &&
            <Field
              label='Status'
              name='status'
              component={DropdownField}
              options={validStatuses}
              searchable={false}
            />}
        </FormRow>
        <FormRow>
          <Field
            label='Occurrence Type'
            name='occurrenceType'
            component={DropdownField}
            options={occurrenceTypeOptions}
            required
            searchable={false}
            onChange={this.handleChangeOccurrenceType}
            containerStyle={{ minWidth: '10rem' }}
          />
          <Field
            label='Date From'
            name='dateFrom'
            htmlId='dateFrom'
            dateFormat={DATE_FORMAT}
            component={DatepickerField}
            showModal={showModal}
            disabled={!showOccurrenceRange}
            onChange={this.handleChangeDateFrom}
          />
          <Field
            label='Date To'
            name='dateTo'
            htmlId='dateTo'
            dateFormat={DATE_FORMAT}
            component={DatepickerField}
            minDate={dateFromValue || null}
            showModal={showModal}
            disabled={!showOccurrenceRange}
            onChange={this.handleChangeDateTo}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Venue'
            name='venue'
            component={EntitySelectorField}
            entityType={ENTITY_TYPE_VENUE}
            required
            getSubEntity={getSubEntity}
            entityDetailsUrlTemplate='/venue/{id}'
            entityDetailsFormatter={venueDetailsFormatter}
            entitySearchLabel='Search for a Venue'
            parentFormName={EDIT_EVENT_BASICS_FORM_NAME}
            getEntityInProgress={getVenueSubEntityInProgress}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Guidance For Finding The Event'
            name='venueGuidance'
            component={TextField}
            maxLength={constraint.venueGuidance.length.maximum}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Event Series'
            name='eventSeries'
            component={EntitySelectorField}
            entityType={ENTITY_TYPE_EVENT_SERIES}
            required={false}
            getSubEntity={getSubEntity}
            entityDetailsUrlTemplate='/event-series/{id}'
            entityDetailsFormatter={eventSeriesDetailsFormatter}
            entitySearchLabel='Search for an Event Series'
            parentFormName={EDIT_EVENT_BASICS_FORM_NAME}
            getEntityInProgress={getEventSeriesSubEntityInProgress}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Duration'
            name='duration'
            component={DropdownField}
            options={DURATION_DROPDOWN_OPTIONS}
          />
          <Field
            label='Event Rating'
            name='rating'
            component={DropdownField}
            options={RATING_DROPDOWN_OPTIONS}
          />
          <Field
            label='Minimum Age'
            name='minAge'
            component={DropdownField}
            options={MIN_AGE_DROPDOWN_OPTIONS}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Summary of Event'
            name='summary'
            component={TextField}
            required
            maxLength={constraint.summary.length.maximum}
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
            maxLength={constraint.descriptionCredit.length.maximum}
          />
        </FormRow>
        <FormRow>
          <Field
            label='We Say'
            name='weSay'
            component={TextField}
            maxLength={constraint.weSay.length.maximum}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Cost Type'
            name='costType'
            component={DropdownField}
            options={COST_TYPE_DROPDOWN_OPTIONS}
            required
            searchable={false}
            onChange={this.handleChangeCostType}
            containerStyle={{ minWidth: '10rem' }}
          />
          <Field
            label='Cost From'
            name='costFrom'
            normalize={money}
            required
            disabled={!showCost}
            component={TextField}
            remainingChars={false}
            icon={GBP}
            maxLength={constraint.costFrom.length.maximum}
          />
          <Field
            label='Cost To'
            name='costTo'
            required
            disabled={!showCost}
            component={TextField}
            remainingChars={false}
            icon={GBP}
            maxLength={constraint.costTo.length.maximum}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Booking Type'
            name='bookingType'
            component={DropdownField}
            options={BOOKING_TYPE_DROPDOWN_OPTIONS}
            required
            searchable={false}
            onChange={this.handleChangeBookingType}
            containerStyle={{ minWidth: '25rem' }}
          />
          <Field
            label='Booking Opens'
            name='bookingOpens'
            htmlId='bookingOpens'
            dateFormat={DATE_FORMAT}
            component={DatepickerField}
            showModal={showModal}
            disabled={!showBookingOpens}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Links'
            name='links'
            component={LinksField}
            parentFormName={EDIT_EVENT_BASICS_FORM_NAME}
            linkActions={linkActions}
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
  validStatuses: PropTypes.array.isRequired,
  getEventSeriesSubEntityInProgress: PropTypes.bool.isRequired,
  getVenueSubEntityInProgress: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.any,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  constraint: PropTypes.object.isRequired,
  getSubEntity: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  linkActions: PropTypes.object.isRequired,
  change: PropTypes.func.isRequired
}

const WrappedEditEventBasicsForm = reduxForm({
  form: EDIT_EVENT_BASICS_FORM_NAME
})(EditEventBasicsForm)

const selector = formValueSelector(EDIT_EVENT_BASICS_FORM_NAME)

export default connect(
  state => ({
    initialValues: state.eventForEdit.entity,
    isEdit: !!state.eventForEdit.entityId,
    validStatuses: state.eventForEdit.entity.validStatuses,
    getEventSeriesSubEntityInProgress: state.eventForEdit
      .getEventSeriesSubEntityInProgress,
    getVenueSubEntityInProgress: state.eventForEdit.getVenueSubEntityInProgress,
    eventTypeValue: selector(state, 'eventType'),
    bookingTypeValue: selector(state, 'bookingType'),
    costTypeValue: selector(state, 'costType'),
    dateFromValue: selector(state, 'dateFrom'),
    occurrenceTypeValue: selector(state, 'occurrenceType'),
    enableReinitialize: true
  }),
  dispatch => ({
    getSubEntity: bindActionCreators(getSubEntity, dispatch),
    linkActions: bindActionCreators(linkActions, dispatch),
    showModal: bindActionCreators(showModal, dispatch)
  })
)(WrappedEditEventBasicsForm)
