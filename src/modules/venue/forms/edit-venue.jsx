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
import SelectField from '_src/components/select/field'
import CheckboxField from '_src/components/checkbox/field'
import HtmlTextField from '_src/components/html-text/field'
import { EditorMapField } from '_src/modules/location'
import { ImagesField } from '_src/modules/image'
import { LinksField } from '_src/modules/link'
import {
  selectors as referenceDataSelectors
} from '_src/modules/reference-data'
import {
  TimesField,
  actions as timeActions,
  DayAndTimePeriodEntry,
  DateAndTimePeriodEntry,
  AddOpeningTimeForm,
  AddAdditionalOpeningTimeForm,
  AddOpeningTimeClosureForm,
  constraints
} from '_src/modules/time'
import * as entityConstants from '_src/constants/entity'
import * as venueConstants from '../constants'
import * as dateLib from '_src/lib/date'

export class EditVenueForm extends React.PureComponent {
  render () {
    const {
      isEdit,
      initialValues,
      submitting,
      handleSubmit,
      onCancel,
      timeActions,
      namedClosuresDropdownOptions
    } = this.props

    const today = dateLib.getTodayDateAsString()

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
            autos={false}
            maxLength={venueConstants.VENUE_CONSTRAINT.name.length.maximum}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Venue Type'
            name='venueType'
            required
            component={SelectField}
            options={venueConstants.VENUE_TYPE_DROPDOWN_OPTIONS}
            searchable={false}
          />
          {isEdit &&
            <Field
              label='Status'
              name='status'
              component={SelectField}
              options={initialValues.validStatuses}
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
            parentFormName={venueConstants.EDIT_VENUE_FORM_NAME}
            name='links'
            component={LinksField}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Wheelchair Access'
            name='wheelchairAccessType'
            required
            component={SelectField}
            options={venueConstants.WHEELCHAIR_ACCESS_TYPE_DROPDOWN_OPTIONS}
            searchable={false}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Disabled Bathroom'
            name='disabledBathroomType'
            required
            component={SelectField}
            options={venueConstants.DISABLED_BATHROOM_TYPE_DROPDOWN_OPTIONS}
            searchable={false}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Hearing Facilities'
            name='hearingFacilitiesType'
            required
            component={SelectField}
            options={venueConstants.HEARING_FACILITIES_TYPE_DROPDOWN_OPTIONS}
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
            maxLength={venueConstants.VENUE_CONSTRAINT.weSay.length.maximum}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Address'
            name='address'
            required
            autos={false}
            component={TextField}
            maxLength={venueConstants.VENUE_CONSTRAINT.address.length.maximum}
          />
        </FormRow>
        <FormRow style={{ width: '50%' }}>
          <Field
            label='Postcode'
            name='postcode'
            required
            autos={false}
            component={TextField}
            maxLength={venueConstants.VENUE_CONSTRAINT.postcode.length.maximum}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Location on Map'
            name='pin'
            required
            component={EditorMapField}
            defaultCenter={initialValues.defaultCenter}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Email'
            name='email'
            autos={false}
            component={TextField}
            maxLength={venueConstants.VENUE_CONSTRAINT.email.length.maximum}
          />
          <Field
            label='Telephone'
            name='telephone'
            autos={false}
            component={TextField}
            maxLength={venueConstants.VENUE_CONSTRAINT.telephone.length.maximum}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Images'
            parentFormName={venueConstants.EDIT_VENUE_FORM_NAME}
            entityType={entityConstants.ENTITY_TYPE_VENUE}
            name='images'
            component={ImagesField}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Opening Times'
            name='openingTimes'
            component={TimesField}
            formComponent={AddOpeningTimeForm}
            itemComponent={DayAndTimePeriodEntry}
            constraint={constraints.OPENING_TIME_CONSTRAINT}
            parentFormName={venueConstants.EDIT_VENUE_FORM_NAME}
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
            constraint={constraints.ADDITIONAL_OPENING_TIME_CONSTRAINT}
            parentFormName={venueConstants.EDIT_VENUE_FORM_NAME}
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
            constraint={constraints.OPENING_TIME_CLOSURE_CONSTRAINT}
            parentFormName={venueConstants.EDIT_VENUE_FORM_NAME}
            minDate={today}
            onSubmit={timeActions.addOpeningTimeClosure}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Named Closures'
            name='namedClosures'
            component={SelectField}
            options={namedClosuresDropdownOptions}
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
            maxLength={venueConstants.VENUE_CONSTRAINT.notes.length.maximum}
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
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.any,
  namedClosuresDropdownOptions: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  timeActions: PropTypes.object.isRequired
}

export default connect(
  /* istanbul ignore next */
  state => ({
    namedClosuresDropdownOptions: referenceDataSelectors.namedClosuresDropdownOptions(
      state
    )
  }),
  /* istanbul ignore next */
  dispatch => ({
    // TODO remove this bind.
    timeActions: bindActionCreators(timeActions, dispatch)
  })
)(
  reduxForm({
    form: venueConstants.EDIT_VENUE_FORM_NAME,
    enableReinitialize: true
  })(EditVenueForm)
)
