import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import FieldBorder from '_src/components/field/border'
import FieldDivider from '_src/components/field/divider'
import Error from '_src/components/error'
import BasicSection from '_src/components/section/basic'
import SectionHeading from '_src/components/section/heading'
import EditableTagCollection from '../components/editable-tag-collection'
import AddTagForm from '../forms/add-tag'
import { selectors as tagSelectors } from '../reducers'
import * as tagConstants from '../constants'
import * as tagActions from '../actions'
import * as tagLib from '../lib/tag'
import './tags-type.scss'

export class TagsTypePage extends React.Component {
  constructor (props) {
    super(props)
    this._getTags(props.tagType)
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.tagType !== this.props.tagType) {
      this._getTags(nextProps.tagType)
    }
  }
  handleDeleteTag = id => {
    this.props.dispatch(tagActions.deleteTag(id))
  }
  handleAddTag = values => {
    this.props.dispatch(tagActions.addTag(values))
  }
  _getTags (tagType) {
    this.props.dispatch(tagActions.getTags(tagType))
  }
  render () {
    const {
      tagType,
      getInProgress,
      getFailed,
      deleteInProgress,
      tags
    } = this.props

    return (
      <BasicSection>
        <SectionHeading>
          <span>{tagType}</span>&nbsp;Tags
        </SectionHeading>
        {getFailed && <Error />}
        {!getFailed &&
          <FieldBorder styleName='field-container'>
            <AddTagForm
              tagType={tagType}
              canAddTag={!getInProgress}
              initialValues={{ tagType, label: '' }}
              onSubmit={this.handleAddTag}
            />
            <FieldDivider />
            <EditableTagCollection
              tags={tags}
              onDelete={this.handleDeleteTag}
              getInProgress={getInProgress}
              deleteInProgress={deleteInProgress}
            />
          </FieldBorder>}
      </BasicSection>
    )
  }
}

TagsTypePage.propTypes = {
  tagType: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(tagConstants.TAG_PROP_TYPES),
  getInProgress: PropTypes.bool.isRequired,
  getFailed: PropTypes.bool.isRequired,
  deleteInProgress: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect(
  /* istanbul ignore next */
  (state, ownProps) => ({
    tagType: tagLib.getTagTypeUrlParameter(ownProps.match),
    tags: tagSelectors.getTagsForType(
      state,
      tagLib.getTagTypeUrlParameter(ownProps.match)
    ),
    getInProgress: tagSelectors.gettingTags(state),
    getFailed: tagSelectors.failedToGetTags(state),
    deleteInProgress: tagSelectors.deletingTag(state)
  })
)(TagsTypePage)
