import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm, arrayPush } from 'redux-form'

import Form from '_src/shared/components/form'
import FormError from '_src/shared/components/form/error'
import FormButtons from '_src/shared/components/form/buttons'
import Divider from '_src/shared/components/divider'
import TagSelector from '../components/tag-selector'
import tagType from '_src/domain/types/tag-type'
import * as eventConstants from '../constants'
import {
  actions as tagActions,
  selectors as tagSelectors
} from '_src/modules/tag'

export class EditEventTagsForm extends React.Component {
  handleAddTag = values => {
    return this.props.dispatch(tagActions.addTag(values)).then(tag => {
      this.props.dispatch(
        arrayPush(
          eventConstants.EDIT_EVENT_TAGS_FORM_NAME,
          `${values.tagType}Tags`,
          tag
        )
      )
    })
  }
  render () {
    const {
      isEdit,
      styleTags,
      mediumTags,
      audienceTags,
      geoTags,
      handleSubmit,
      error,
      submitting,
      onCancel,
      onPreviousPage
    } = this.props

    return (
      <Form onSubmit={handleSubmit}>
        <TagSelector
          tagType={tagType.MEDIUM}
          label='Medium Tags'
          name='mediumTags'
          options={mediumTags}
          required
          onAddTag={this.handleAddTag}
        />
        <TagSelector
          tagType={tagType.STYLE}
          label='Style Tags'
          name='styleTags'
          options={styleTags}
          onAddTag={this.handleAddTag}
        />
        <TagSelector
          tagType={tagType.AUDIENCE}
          label='Audience Tags'
          name='audienceTags'
          options={audienceTags}
          onAddTag={this.handleAddTag}
        />
        <TagSelector
          tagType={tagType.GEO}
          label='Geo Tags'
          name='geoTags'
          options={geoTags}
          onAddTag={this.handleAddTag}
        />
        <Divider />
        <FormError error={error} />
        <FormButtons
          submitLabel='Next'
          submitting={submitting}
          onCancel={isEdit ? onCancel : null}
          onPrevious={onPreviousPage}
        />
      </Form>
    )
  }
}

EditEventTagsForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  isEdit: PropTypes.bool.isRequired,
  styleTags: PropTypes.array.isRequired,
  audienceTags: PropTypes.array.isRequired,
  geoTags: PropTypes.array.isRequired,
  mediumTags: PropTypes.array.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.any,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onPreviousPage: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect(
  /* istanbul ignore next */
  state => ({
    styleTags: tagSelectors.getTagsForType(state, tagType.STYLE),
    audienceTags: tagSelectors.getTagsForType(state, tagType.AUDIENCE),
    geoTags: tagSelectors.getTagsForType(state, tagType.GEO),
    mediumTags: tagSelectors.getTagsForType(state, tagType.MEDIUM)
  })
)(
  reduxForm({
    form: eventConstants.EDIT_EVENT_TAGS_FORM_NAME,
    enableReinitialize: true
  })(EditEventTagsForm)
)
