import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm, arrayPush } from 'redux-form'
import _ from 'lodash'

import LoaderPanel from '_src/shared/components/loader/panel'
import Form from '_src/shared/components/form'
import FormError from '_src/shared/components/form/error'
import FormButtons from '_src/shared/components/form/buttons'
import Divider from '_src/shared/components/divider'
import TagSelector from '../components/tag-selector'
import tagType from '_src/domain/types/tag-type'
import * as eventConstants from '../constants'
import { actions as tagActions } from '_src/modules/tag'
import { selectors as eventSelectors } from '../reducers'

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
      tags,
      handleSubmit,
      error,
      submitting,
      onCancel,
      onPreviousPage
    } = this.props

    const hasTags = !_.isNil(tags)

    return (
      <Form onSubmit={handleSubmit}>
        {!hasTags && <LoaderPanel size='large' />}
        {hasTags &&
          <TagSelector
            tagType={tagType.MEDIUM}
            label='Medium Tags'
            name='mediumTags'
            options={tags.medium}
            required
            onAddTag={this.handleAddTag}
          />}
        {hasTags &&
          <TagSelector
            tagType={tagType.STYLE}
            label='Style Tags'
            name='styleTags'
            options={tags.style}
            onAddTag={this.handleAddTag}
          />}
        {hasTags &&
          <TagSelector
            tagType={tagType.AUDIENCE}
            label='Audience Tags'
            name='audienceTags'
            options={tags.audience}
            onAddTag={this.handleAddTag}
          />}
        {hasTags &&
          <TagSelector
            tagType={tagType.GEO}
            label='Geo Tags'
            name='geoTags'
            options={tags.geo}
            onAddTag={this.handleAddTag}
          />}
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
  tags: PropTypes.object,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.any,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onPreviousPage: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect(state => ({
  tags: eventSelectors.tags(state)
}))(
  reduxForm({
    form: eventConstants.EDIT_EVENT_TAGS_FORM_NAME,
    enableReinitialize: true
  })(EditEventTagsForm)
)
