import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import Form from '_src/components/form'
import FormRow from '_src/components/form/row'
import TextField from '_src/components/text/field'
import FormButtons from '_src/components/form/buttons'
import Divider from '_src/components/divider'
import SelectField from '_src/components/select/field'
import HtmlTextField from '_src/components/html-text/field'
import * as entityConstants from '_src/constants/entity'
import * as eventSeriesConstants from '../constants'
import { actions as imageActions, ImagesField } from '_src/modules/image'
import { actions as linkActions, LinksField } from '_src/modules/link'

export class EditEventSeriesForm extends React.Component {
  handleAddLink = values => {
    this.props.dispatch(
      linkActions.addLink(
        values,
        eventSeriesConstants.EDIT_EVENT_SERIES_FORM_NAME
      )
    )
  }
  handleDeleteLink = id => {
    this.props.dispatch(
      linkActions.deleteLink(
        id,
        eventSeriesConstants.EDIT_EVENT_SERIES_FORM_NAME
      )
    )
  }
  handleAddImage = values => {
    this.props.dispatch(
      imageActions.addImage(
        values,
        entityConstants.ENTITY_TYPE_EVENT_SERIES,
        eventSeriesConstants.EDIT_EVENT_SERIES_FORM_NAME
      )
    )
  }
  handleUpdateImage = ({ values, id }) => {
    return this.props.dispatch(
      imageActions.updateImage(
        values,
        id,
        eventSeriesConstants.EDIT_EVENT_SERIES_FORM_NAME
      )
    )
  }
  handleSetMainImage = id => {
    this.props.dispatch(
      imageActions.setMainImage(
        id,
        eventSeriesConstants.EDIT_EVENT_SERIES_FORM_NAME
      )
    )
  }
  handleDeleteImage = id => {
    this.props.dispatch(
      imageActions.deleteImage(
        id,
        eventSeriesConstants.EDIT_EVENT_SERIES_FORM_NAME
      )
    )
  }
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
            name='links'
            component={LinksField}
            onAddLink={this.handleAddLink}
            onDeleteLink={this.handleDeleteLink}
          />
        </FormRow>
        <FormRow>
          <Field
            label='Images'
            entityType={entityConstants.ENTITY_TYPE_EVENT_SERIES}
            name='images'
            component={ImagesField}
            onAddImage={this.handleAddImage}
            onUpdateImage={this.handleUpdateImage}
            onSetMainImage={this.handleSetMainImage}
            onDeleteImage={this.handleDeleteImage}
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
  change: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
}

const WrappedEditEventSeriesForm = reduxForm({
  form: eventSeriesConstants.EDIT_EVENT_SERIES_FORM_NAME,
  enableReinitialize: true
})(EditEventSeriesForm)

export default connect()(WrappedEditEventSeriesForm)
