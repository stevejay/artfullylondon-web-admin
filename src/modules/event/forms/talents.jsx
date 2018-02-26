import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm, change } from 'redux-form'
import { withState } from 'recompose'

import Form from '_src/shared/components/form'
import FormRow from '_src/shared/components/form/row'
import FormError from '_src/shared/components/form/error'
import FormSectionHeader from '_src/shared/components/form/section-header'
import FormButtons from '_src/shared/components/form/buttons'
import Divider from '_src/shared/components/divider'
import Button from '_src/shared/components/button'
import Modal from '_src/shared/components/modal'
import ModalContainer from '_src/shared/components/modal/container'
import FadeTransition from '_src/shared/components/transition/fade'
import entityType from '_src/domain/types/entity-type'
import EntitySelectorSearch from '../components/entity-selector-search'
import * as eventConstants from '../constants'
import {
  TalentsField,
  CreateBasicTalentForm,
  getBasicTalentInitialValues
} from '_src/modules/talent'
import { actions as searchActions } from '_src/modules/search'
import * as arrayLib from '_src/shared/lib/array'
import './talents.scss'

export class EditEventTalentsForm extends React.Component {
  constructor (props) {
    super(props)
    this.talentInitialValues = getBasicTalentInitialValues()
  }
  talentFieldMounted = ref => {
    this._talent = ref
  }
  handleAutocompleteSelect = (entityType, id, item) => {
    // TODO improve this method

    try {
      const newTalent = {
        key: id,
        id: id,
        name: item.output,
        status: item.status,
        talentType: item.talentType,
        commonRole: item.commonRole,
        roles: item.commonRole,
        characters: ''
      }

      const newValue = arrayLib.addElement(this._talent.value, newTalent)

      if (newValue) {
        this.props.dispatch(
          change(
            eventConstants.EDIT_EVENT_TALENTS_FORM_NAME,
            'talents',
            newValue
          )
        )

        return Promise.resolve()
      } else {
        return Promise.reject(new Error('Already exists'))
      }
    } catch (err) {
      return Promise.reject(err)
    }
  }
  handleAutocompleteSearch = (term, entityType) => {
    return this.props.dispatch(
      searchActions.autocompleteSearch(term, entityType)
    )
  }
  handleShowModal = () => {
    this.props.setShowingModal(true)
  }
  handleHideModal = () => {
    this.props.setShowingModal(false)
  }
  handleCreateTalent = values => {
    console.log('handleCreateTalent', values)

    this.handleHideModal()
  }
  render () {
    const {
      isEdit,
      handleSubmit,
      error,
      submitting,
      onCancel,
      onPreviousPage,
      showingModal
    } = this.props

    return (
      <React.Fragment>
        <Form onSubmit={handleSubmit}>
          <FormSectionHeader>Talents</FormSectionHeader>
          <EntitySelectorSearch
            entityType={entityType.TALENT}
            onAutocompleteSearch={this.handleAutocompleteSearch}
            onAutocompleteSelect={this.handleAutocompleteSelect}
          />
          <FormRow>
            <Field
              ref={this.talentFieldMounted}
              label=''
              name='talents'
              component={TalentsField}
              containerStyle={{ paddingTop: 0 }}
            />
          </FormRow>
          <Button
            aria-label='Create a new Talent'
            onClick={this.handleShowModal}
            disabled={submitting}
          >
            Create a new Talent…
          </Button>
          <Divider styleName='last-divider' />
          <FormError error={error} />
          <FormButtons
            submitLabel='Next'
            submitting={submitting}
            onCancel={isEdit ? onCancel : null}
            onPrevious={onPreviousPage}
          />
        </Form>
        <Modal
          show={showingModal}
          transition={FadeTransition}
          onHide={this.handleHideModal}
          aria-label='Datepicker'
        >
          <ModalContainer
            title='Create New Talent'
            type='wide'
            onHide={this.handleHideModal}
          >
            <CreateBasicTalentForm
              styleName='modal-form'
              onSubmit={this.handleCreateTalent}
              onCancel={this.handleHideModal}
              initialValues={this.talentInitialValues}
            />
          </ModalContainer>
        </Modal>
      </React.Fragment>
    )
  }
}

EditEventTalentsForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  isEdit: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.any,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onPreviousPage: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  showingModal: PropTypes.bool.isRequired,
  setShowingModal: PropTypes.func.isRequired
}

export default connect()(
  withState('showingModal', 'setShowingModal', false)(
    reduxForm({
      form: eventConstants.EDIT_EVENT_TALENTS_FORM_NAME,
      enableReinitialize: true
    })(EditEventTalentsForm)
  )
)
