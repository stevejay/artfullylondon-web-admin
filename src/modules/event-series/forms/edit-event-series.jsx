import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'

import Form from '_src/shared/components/form'
import FormRow from '_src/shared/components/form/row'
import TextField from '_src/shared/components/text/field'
import FormButtons from '_src/shared/components/form/buttons'
import Divider from '_src/shared/components/divider'
import SelectField from '_src/shared/components/select/field'
import HtmlTextField from '_src/shared/components/html-text/field'
import * as eventSeriesConstants from '../constants'
import { ImagesField } from '_src/modules/image'
import { LinksField } from '_src/modules/link'
import entityType from '_src/domain/types/entity-type'

export class EditEventSeriesForm extends React.PureComponent {
  render () {
    const {
      isEdit,
      initialValues,
      submitting,
      handleSubmit,
      onCancel
    } = this.props

    return (
      <Form onSubmit={handleSubmit}>
        <Divider />
        <FormRow>
          <Field
            label='Name'
            name='name'
            required
            autofocus
            component={TextField}
            forceSingleLine
            maxLength={
              eventSeriesConstants.EVENT_SERIES_CONSTRAINT.name.length.maximum
            }
          />
        </FormRow>
        <FormRow>
          <Field
            label='Event Series Type'
            name='eventSeriesType'
            required
            component={SelectField}
            options={eventSeriesConstants.EVENT_SERIES_TYPE_DROPDOWN_OPTIONS}
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
            label='Occurrence'
            name='occurrence'
            component={TextField}
            required
            maxLength={
              eventSeriesConstants.EVENT_SERIES_CONSTRAINT.occurrence.length
                .maximum
            }
          />
        </FormRow>
        <FormRow>
          <Field
            label='Summary'
            name='summary'
            component={TextField}
            required
            maxLength={
              eventSeriesConstants.EVENT_SERIES_CONSTRAINT.summary.length
                .maximum
            }
          />
        </FormRow>
        <FormRow>
          <Field
            label='Full Description'
            name='description'
            component={HtmlTextField}
            required
            maxLength={5000}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Full Description Credit'
            name='descriptionCredit'
            component={TextField}
            forceSingleLine
            maxLength={
              eventSeriesConstants.EVENT_SERIES_CONSTRAINT.descriptionCredit
                .length.maximum
            }
          />
        </FormRow>
        <FormRow>
          <Field
            label='We Say'
            name='weSay'
            component={TextField}
            maxLength={
              eventSeriesConstants.EVENT_SERIES_CONSTRAINT.weSay.length.maximum
            }
          />
        </FormRow>
        <FormRow>
          <Field
            label='Links'
            parentFormName={eventSeriesConstants.EDIT_EVENT_SERIES_FORM_NAME}
            name='links'
            component={LinksField}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Images'
            parentFormName={eventSeriesConstants.EDIT_EVENT_SERIES_FORM_NAME}
            entityType={entityType.EVENT_SERIES}
            name='images'
            component={ImagesField}
          />
        </FormRow>
        <Divider />
        <FormButtons
          submitting={submitting}
          onCancel={isEdit ? onCancel : null}
        />
      </Form>
    )
  }
}

EditEventSeriesForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  isEdit: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.any,
  handleSubmit: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired
}

const WrappedEditEventSeriesForm = reduxForm({
  form: eventSeriesConstants.EDIT_EVENT_SERIES_FORM_NAME,
  enableReinitialize: true
})(EditEventSeriesForm)

export default WrappedEditEventSeriesForm
