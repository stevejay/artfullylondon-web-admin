import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Error from '_src/components/error'
import BoxesLoader from '_src/components/loader/boxes'
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
    this._getTags(tagLib.getTagTypeUrlParameter(props.match))
  }
  componentWillReceiveProps (nextProps) {
    const nextTagType = tagLib.getTagTypeUrlParameter(nextProps.match)

    if (nextTagType !== tagLib.getTagTypeUrlParameter(this.props.match)) {
      this._getTags(nextTagType)
    }
  }
  handleDeleteTag = id => {
    this.props.dispatch({
      type: tagActionTypes.DELETE_TAG,
      payload: { id }
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
      getInProgress,
      getFailed,
      deleteInProgress,
      tags,
      match
    } = this.props

    const tagType = tagLib.getTagTypeUrlParameter(match)

    return (
      <BasicSection>
        <SectionHeading>
          <span>{tagType}</span>&nbsp;Tags
        </SectionHeading>
        {getInProgress && <BoxesLoader />}
        {getFailed && <Error />}
        {!getInProgress &&
          !getFailed &&
          <TagsEditor
            tagType={tagType}
            value={tags}
            onDelete={this.handleDeleteTag}
            deleteInProgress={deleteInProgress}
          />}
      </BasicSection>
    )
  }
}

TagsType.propTypes = {
  tags: PropTypes.array.isRequired,
  getInProgress: PropTypes.bool.isRequired,
  getFailed: PropTypes.bool.isRequired,
  deleteInProgress: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect((state, ownProps) => ({
  tags: tagSelectors.getTagsForType(
    state,
    tagLib.getTagTypeUrlParameter(ownProps.match)
  ),
  getInProgress: state.tag.getInProgress,
  getFailed: state.tag.getFailed,
  deleteInProgress: state.tag.deleteInProgress
}))(TagsType)
