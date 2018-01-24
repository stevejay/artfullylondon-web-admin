import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Error from '_src/components/error'
import BasicSection from '_src/components/section/basic'
import SectionHeading from '_src/components/section/heading'
import DetailsContainer from '_src/components/entity/details-container'
import TagsEditor from '_src/modules/tags/components/tags-editor'
import * as tagSelectors from '_src/store/selectors/tag'
import * as tagActionTypes from '_src/constants/action/tag'
import * as tagConstants from '_src/constants/tag'
import * as tagLib from '_src/lib/tag'

class TagsType extends React.Component {
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
    this.props.dispatch({
      type: tagActionTypes.DELETE_TAG,
      payload: { id }
    })
  }
  handleAddTag = values => {
    this.props.dispatch({
      type: tagActionTypes.ADD_TAG,
      payload: values
    })
  }
  _getTags (tagType) {
    this.props.dispatch({
      type: tagActionTypes.GET_TAGS,
      payload: { tagType }
    })
  }
  render () {
    const {
      tagType,
      getInProgress,
      getFailed,
      deleteInProgress,
      tags,
      match
    } = this.props

    return (
      <BasicSection>
        <SectionHeading>
          <span>{tagType}</span>&nbsp;Tags
        </SectionHeading>
        {getFailed && <Error />}
        {!getFailed &&
          <TagsEditor
            tagType={tagType}
            tags={tags}
            getInProgress={getInProgress}
            onDelete={this.handleDeleteTag}
            onAdd={this.handleAddTag}
            deleteInProgress={deleteInProgress}
          />}
      </BasicSection>
    )
  }
}

TagsType.propTypes = {
  tagType: PropTypes.string.isRequired,
  tags: PropTypes.array,
  getInProgress: PropTypes.bool.isRequired,
  getFailed: PropTypes.bool.isRequired,
  deleteInProgress: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect((state, ownProps) => ({
  tagType: tagLib.getTagTypeUrlParameter(ownProps.match),
  tags: tagSelectors.getTagsForType(
    state,
    tagLib.getTagTypeUrlParameter(ownProps.match)
  ),
  getInProgress: state.tag.getInProgress,
  getFailed: state.tag.getFailed,
  deleteInProgress: state.tag.deleteInProgress
}))(TagsType)
