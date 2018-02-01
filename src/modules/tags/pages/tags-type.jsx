import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import FieldBorder from '_src/components/field/border'
import FieldDivider from '_src/components/field/divider'
import Error from '_src/components/error'
import BasicSection from '_src/components/section/basic'
import SectionHeading from '_src/components/section/heading'
import TagCollection from '_src/modules/tags/components/tag-collection'
import AddTagForm from '_src/modules/tags/forms/add-tag'
import * as tagSelectors from '_src/store/selectors/tag'
import * as tagActions from '_src/store/actions/tag'
import * as tagLib from '_src/lib/tag'
import './tags-type.scss'

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
            <TagCollection
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
