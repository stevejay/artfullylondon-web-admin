import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'
import Form from '_src/components/form'
import FormRow from '_src/components/form/row'
import FormButtons from '_src/components/form/buttons'
import Divider from '_src/components/divider'
import FormError from '_src/components/form/error'
import DropdownField from '_src/components/dropdown/field'
import ButtonField from '_src/components/button/field'
import Loader from '_src/components/loader'
import {
  TAG_TYPE_AUDIENCE,
  TAG_TYPE_GEO,
  TAG_TYPE_MEDIUM,
  TAG_TYPE_STYLE
} from '_src/constants/tag'
import { EDIT_EVENT_TAGS_FORM_NAME } from '_src/constants/form'
import { addTag } from '_src/actions/tag'
import { showModal } from '_src/actions/modal'
import AddTagModal from '_src/containers/modals/add-tag'

export class EditEventTagsForm extends React.Component {
  handleNewAudienceTagClick = () => {
    this._showAddTagModal('New Audience Tag', TAG_TYPE_AUDIENCE)
  }
  handleNewGeoTagClick = () => {
    this._showAddTagModal('New Geo Tag', TAG_TYPE_GEO)
  }
  handleNewMediumTagClick = () => {
    this._showAddTagModal('New Medium Tag', TAG_TYPE_MEDIUM)
  }
  handleNewStyleTagClick = () => {
    this._showAddTagModal('New Style Tag', TAG_TYPE_STYLE)
  }
  _showAddTagModal (title, tagType) {
    this.props.showModal({
      component: AddTagModal,
      componentProps: {
        title,
        tagType,
        onSubmit: this.props.addTag
      }
    })
  }
  renderTags (label, name, options, onClick, required) {
    return (
      <FormRow>
        <Field
          label={label}
          name={name}
          component={DropdownField}
          options={options}
          required={required}
          searchable={false}
          multi
          valueKey='id'
          containerStyle={{ flexBasis: 'auto' }}
        />
        <ButtonField
          label='New…'
          type='button'
          submitting={false}
          onClick={onClick}
        />
      </FormRow>
    )
  }
  render () {
    const {
      getTagsInProgress,
      handleSubmit,
      error,
      submitting,
      isEdit,
      onCancel,
      previousPage,
      audienceTags,
      geoTags,
      mediumTags,
      styleTags
    } = this.props

    if (getTagsInProgress) {
      return <Loader size='massive' />
    }

    return (
      <Form onSubmit={handleSubmit}>
        {this.renderTags(
          'Medium Tags',
          'mediumTags',
          mediumTags,
          this.handleNewMediumTagClick,
          true
        )}
        {this.renderTags(
          'Style Tags',
          'styleTags',
          styleTags,
          this.handleNewStyleTagClick,
          false
        )}
        {this.renderTags(
          'Audience Tags',
          'audienceTags',
          audienceTags,
          this.handleNewAudienceTagClick,
          false
        )}
        {this.renderTags(
          'Geo Tags',
          'geoTags',
          geoTags,
          this.handleNewGeoTagClick,
          false
        )}
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

EditEventTagsForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  isEdit: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.any,
  handleSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  getTagsInProgress: PropTypes.bool.isRequired,
  audienceTags: PropTypes.array.isRequired,
  geoTags: PropTypes.array.isRequired,
  mediumTags: PropTypes.array.isRequired,
  styleTags: PropTypes.array.isRequired,
  addTag: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired
}

const WrappedEditEventTagsForm = reduxForm({
  form: EDIT_EVENT_TAGS_FORM_NAME
})(EditEventTagsForm)

export default connect(
  state => ({
    initialValues: state.eventForEdit.entity,
    isEdit: !!state.eventForEdit.entityId,
    geoTags: state.tag.geo,
    mediumTags: state.tag.medium,
    styleTags: state.tag.style,
    audienceTags: state.tag.audience,
    getTagsInProgress: state.tag.getInProgress
  }),
  dispatch => ({
    addTag: bindActionCreators(addTag, dispatch),
    showModal: bindActionCreators(showModal, dispatch)
  })
)(WrappedEditEventTagsForm)
