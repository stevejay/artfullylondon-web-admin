import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { ENTITY_TYPE_EVENT_SERIES } from '_src/constants/entity'
import Form from '_src/components/form'
import FormRow from '_src/components/form/row'
import TextField from '_src/components/text/field'
import FormButtons from '_src/components/form/buttons'
import Divider from '_src/components/divider'
import DropdownField from '_src/components/dropdown/field'
import LinksField from '_src/components/links/field'
import ImagesField from '_src/components/images/field'
import HtmlTextField from '_src/components/html-text/field'
import {
  EVENT_SERIES_TYPE_DROPDOWN_OPTIONS
} from '_src/constants/event-series'
import { EDIT_EVENT_SERIES_FORM_NAME } from '_src/constants/form'
import * as imageActions from '_src/actions/image'
import * as linkActions from '_src/actions/link'
import { showModal } from '_src/actions/modal'

export const EditEventSeriesForm = ({
  isEdit,
  validStatuses,
  submitting,
  handleSubmit,
  onCancel,
  constraint,
  imageActions,
  linkActions,
  showModal
}) => (
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
        maxLength={constraint.name.length.maximum}
      />
    </FormRow>
    <FormRow>
      <Field
        label='Event Series Type'
        name='eventSeriesType'
        required
        component={DropdownField}
        options={EVENT_SERIES_TYPE_DROPDOWN_OPTIONS}
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
        label='Occurrence'
        name='occurrence'
        component={TextField}
        required
        maxLength={constraint.occurrence.length.maximum}
      />
    </FormRow>
    <FormRow>
      <Field
        label='Summary'
        name='summary'
        component={TextField}
        required
        maxLength={constraint.summary.length.maximum}
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
        label='Links'
        name='links'
        component={LinksField}
        parentFormName={EDIT_EVENT_SERIES_FORM_NAME}
        linkActions={linkActions}
      />
    </FormRow>
    <FormRow>
      <Field
        label='Images'
        entityType={ENTITY_TYPE_EVENT_SERIES}
        name='images'
        component={ImagesField}
        parentFormName={EDIT_EVENT_SERIES_FORM_NAME}
        imageActions={imageActions}
        showModal={showModal}
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

EditEventSeriesForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  isEdit: PropTypes.bool.isRequired,
  validStatuses: PropTypes.array.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.any,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  constraint: PropTypes.object.isRequired,
  imageActions: PropTypes.object.isRequired,
  linkActions: PropTypes.object.isRequired,
  showModal: PropTypes.func.isRequired
}

export default connect(
  state => ({
    initialValues: state.eventSeriesForEdit.entity,
    validStatuses: state.eventSeriesForEdit.entity.validStatuses,
    isEdit: !!state.eventSeriesForEdit.entityId,
    enableReinitialize: true
  }),
  dispatch => ({
    imageActions: bindActionCreators(imageActions, dispatch),
    linkActions: bindActionCreators(linkActions, dispatch),
    showModal: bindActionCreators(showModal, dispatch)
  })
)(
  reduxForm({
    form: EDIT_EVENT_SERIES_FORM_NAME
  })(EditEventSeriesForm)
)
