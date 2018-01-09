import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm } from 'redux-form'
import Form from '_src/components/form'
import FormRow from '_src/components/form/row'
import TextField from '_src/components/text/field'
import FormButtons from '_src/components/form/buttons'
import Divider from '_src/components/divider'
import DropdownField from '_src/components/dropdown/field'
import CheckboxField from '_src/components/checkbox/field'
import { ENTITY_TYPE_VENUE } from '_src/constants/entity'
import { NAMED_CLOSURE_TYPE_DROPDOWN_OPTIONS } from '_src/constants/time'
import * as timeLib from '_src/lib/time'
import LinksField from '_src/components/links/field'
import ImagesField from '_src/components/images/field'
import HtmlTextField from '_src/components/html-text/field'
import MapField from '_src/components/map/field'
import TimesField from '_src/components/times/field'
import DayAndTimePeriodEntry
  from '_src/components/time/day-and-time-period-entry'
import DateAndTimePeriodEntry
  from '_src/components/time/date-and-time-period-entry'
import AddOpeningTimeForm from '_src/containers/forms/add-opening-time'
import AddAdditionalOpeningTimeForm
  from '_src/containers/forms/add-additional-opening-time'
import AddOpeningTimeClosureForm
  from '_src/containers/forms/add-opening-time-closure'
import { VENUE_TYPE_DROPDOWN_OPTIONS } from '_src/constants/venue'
import {
  openingTimeConstraint,
  additionalOpeningTimeConstraint,
  openingTimeClosureConstraint
} from '_src/constants/time-constraints'
import {
  WHEELCHAIR_ACCESS_TYPE_DROPDOWN_OPTIONS,
  DISABLED_BATHROOM_TYPE_DROPDOWN_OPTIONS,
  HEARING_FACILITIES_TYPE_DROPDOWN_OPTIONS
} from '_src/constants/access'
import * as imageActions from '_src/actions/image'
import * as linkActions from '_src/actions/link'
import * as timeActions from '_src/actions/time'
import { showModal } from '_src/actions/modal'
import { EDIT_VENUE_FORM_NAME } from '_src/constants/form'

export class EditVenueForm extends React.Component {
  render () {
    const {
      isEdit,
      validStatuses,
      submitting,
      handleSubmit,
      onCancel,
      constraint,
      defaultCenter,
      imageActions,
      linkActions,
      showModal,
      timeActions
    } = this.props

    const today = timeLib.getTodayDateAsString()

    return (
      <Form onSubmit={handleSubmit}>
        <FormRow>
          <Field
            label='Name'
            name='name'
            required
            autofocus
            component={TextField}
            forceSingleLine
            maxLength={constraint.name.length.maximum}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Venue Type'
            name='venueType'
            required
            component={DropdownField}
            options={VENUE_TYPE_DROPDOWN_OPTIONS}
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
            label='Permanent Collection'
            name='hasPermanentCollection'
            component={CheckboxField}
            checkboxLabel='Has a permanent collection'
          />
        </FormRow>
        <FormRow>
          <Field
            label='Links'
            name='links'
            component={LinksField}
            parentFormName={EDIT_VENUE_FORM_NAME}
            linkActions={linkActions}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Wheelchair Access'
            name='wheelchairAccessType'
            required
            component={DropdownField}
            options={WHEELCHAIR_ACCESS_TYPE_DROPDOWN_OPTIONS}
            searchable={false}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Disabled Bathroom'
            name='disabledBathroomType'
            required
            component={DropdownField}
            options={DISABLED_BATHROOM_TYPE_DROPDOWN_OPTIONS}
            searchable={false}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Hearing Facilities'
            name='hearingFacilitiesType'
            required
            component={DropdownField}
            options={HEARING_FACILITIES_TYPE_DROPDOWN_OPTIONS}
            searchable={false}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Description'
            name='description'
            component={HtmlTextField}
            maxLength={5000}
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
            label='Address'
            name='address'
            required
            component={TextField}
            maxLength={constraint.address.length.maximum}
          />
        </FormRow>
        <FormRow style={{ width: '50%' }}>
          <Field
            label='Postcode'
            name='postcode'
            required
            component={TextField}
            maxLength={constraint.postcode.length.maximum}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Location on Map'
            name='pin'
            required
            component={MapField}
            defaultCenter={defaultCenter}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Email'
            name='email'
            component={TextField}
            maxLength={constraint.email.length.maximum}
          />
          <Field
            label='Telephone'
            name='telephone'
            component={TextField}
            maxLength={constraint.telephone.length.maximum}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Images'
            entityType={ENTITY_TYPE_VENUE}
            name='images'
            component={ImagesField}
            parentFormName={EDIT_VENUE_FORM_NAME}
            imageActions={imageActions}
            showModal={showModal}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Opening Times'
            name='openingTimes'
            component={TimesField}
            formComponent={AddOpeningTimeForm}
            itemComponent={DayAndTimePeriodEntry}
            constraint={openingTimeConstraint}
            parentFormName={EDIT_VENUE_FORM_NAME}
            onSubmit={timeActions.addOpeningTime}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Additional Opening Times'
            name='additionalOpeningTimes'
            component={TimesField}
            formComponent={AddAdditionalOpeningTimeForm}
            itemComponent={DateAndTimePeriodEntry}
            constraint={additionalOpeningTimeConstraint}
            parentFormName={EDIT_VENUE_FORM_NAME}
            onSubmit={timeActions.addAdditionalOpeningTime}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Closures'
            name='openingTimesClosures'
            component={TimesField}
            formComponent={AddOpeningTimeClosureForm}
            itemComponent={DateAndTimePeriodEntry}
            constraint={openingTimeClosureConstraint}
            parentFormName={EDIT_VENUE_FORM_NAME}
            minDate={today}
            showModal={showModal}
            onSubmit={timeActions.addOpeningTimeClosure}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Named Closures'
            name='namedClosures'
            component={DropdownField}
            options={NAMED_CLOSURE_TYPE_DROPDOWN_OPTIONS}
            searchable
            multi
            simpleValue
          />
        </FormRow>
        <FormRow>
          <Field
            label='Notes'
            name='notes'
            component={TextField}
            maxLength={constraint.notes.length.maximum}
          />
        </FormRow>
        <Divider />
        <FormButtons
          submitLabel='Submit'
          submitting={submitting}
          onCancel={isEdit ? onCancel : null}
        />
      </Form>
    )
  }
}

EditVenueForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  isEdit: PropTypes.bool.isRequired,
  validStatuses: PropTypes.array.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.any,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  constraint: PropTypes.object.isRequired,
  defaultCenter: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }).isRequired,
  imageActions: PropTypes.object.isRequired,
  linkActions: PropTypes.object.isRequired,
  timeActions: PropTypes.object.isRequired,
  showModal: PropTypes.func.isRequired
}

export default connect(
  state => ({
    initialValues: state.venueForEdit.entity,
    defaultCenter: state.venueForEdit.entity.defaultCenter,
    validStatuses: state.venueForEdit.entity.validStatuses,
    isEdit: !!state.venueForEdit.entityId,
    enableReinitialize: true
  }),
  dispatch => ({
    imageActions: bindActionCreators(imageActions, dispatch),
    linkActions: bindActionCreators(linkActions, dispatch),
    timeActions: bindActionCreators(timeActions, dispatch),
    showModal: bindActionCreators(showModal, dispatch)
  })
)(reduxForm({ form: EDIT_VENUE_FORM_NAME })(EditVenueForm))
