import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm, change, isPristine } from 'redux-form'
import Form from '_src/components/form'
import FormRow from '_src/components/form/row'
import FormButtons from '_src/components/form/buttons'
import Divider from '_src/components/divider'
import FormError from '_src/components/form/error'
import FormSectionHeader from '_src/components/form/section-header'
import TalentsField from '_src/components/talents/field'
import { ENTITY_TYPE_TALENT } from '_src/constants/entity'
import talentConstraint from '_src/constants/talent-constraint'
import CreateTalentForm from '_src/containers/forms/create-talent'
import {
  EDIT_EVENT_TALENTS_FORM_NAME,
  CREATE_TALENT_FORM_NAME
} from '_src/constants/form'
import { createTalentForEvent } from '_src/actions/entity'
import EntitySelectorSearch from '_src/components/entity-selector/search'
import { addNotification } from '_src/actions/notifications'
import array from '_src/lib/array'

export class EditEventTalentsForm extends React.Component {
  handleSelectEntity = result => {
    const newTalent = {
      key: result.id,
      id: result.id,
      name: result.name,
      status: result.status,
      talentType: result.talentType,
      commonRole: result.commonRole,
      roles: result.commonRole,
      characters: ''
    }

    this._addNewTalent(newTalent)
  }
  _addNewTalent (newTalent) {
    const newValue = array.addElement(this._talent.value, newTalent)

    if (newValue) {
      this.props.changeAction(EDIT_EVENT_TALENTS_FORM_NAME, 'talents', newValue)
    }
  }
  handleCreateTalent = values => {
    this.props.createTalentForEvent({
      values,
      parentFormName: EDIT_EVENT_TALENTS_FORM_NAME,
      forceCreate: false
    })
  }
  handleSubmit = values => {
    const { linkEditorIsPristine, onSubmit, addNotification } = this.props

    if (linkEditorIsPristine) {
      return onSubmit(values)
    } else {
      addNotification({
        type: 'Error',
        title: 'Submit Cancelled',
        message: 'There are unsaved changes in the Create New Talent editor.'
      })
    }
  }
  render () {
    const {
      handleSubmit,
      error,
      submitting,
      onCancel,
      previousPage,
      isEdit
    } = this.props

    return (
      <Form onSubmit={() => handleSubmit(this.handleSubmit)}>
        <FormSectionHeader>Talent</FormSectionHeader>
        <FormRow>
          <Field
            ref={ref => (this._talent = ref)}
            label=''
            name='talents'
            component={TalentsField}
            containerStyle={{ paddingTop: 0 }}
          />
        </FormRow>
        <Divider type='hidden' />
        <FormSectionHeader>Search for Talent</FormSectionHeader>
        <EntitySelectorSearch
          ref={ref => (this._search = ref)}
          entityType={ENTITY_TYPE_TALENT}
          onSelectEntity={this.handleSelectEntity}
          error={null}
          entitySearchLabel='Search for a Talent'
        />
        <Divider type='hidden' />
        <FormSectionHeader>Create New Talent</FormSectionHeader>
        <CreateTalentForm
          ref={ref => (this._createForm = ref)}
          onSubmit={this.handleCreateTalent}
          constraint={talentConstraint}
        />
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

EditEventTalentsForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  isEdit: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.any,
  linkEditorIsPristine: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  changeAction: PropTypes.func.isRequired,
  createTalentForEvent: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired
}

const WrappedEditEventTalentForm = reduxForm({
  form: EDIT_EVENT_TALENTS_FORM_NAME
})(EditEventTalentsForm)

export default connect(
  state => ({
    initialValues: state.eventForEdit.entity,
    isEdit: !!state.eventForEdit.entityId,
    linkEditorIsPristine: isPristine(CREATE_TALENT_FORM_NAME)(state)
  }),
  dispatch => ({
    changeAction: bindActionCreators(change, dispatch),
    createTalentForEvent: bindActionCreators(createTalentForEvent, dispatch),
    addNotification: bindActionCreators(addNotification, dispatch)
  })
)(WrappedEditEventTalentForm)
