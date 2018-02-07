import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TagsIcon from 'react-icons/lib/fa/tags'
import { bindActionCreators } from 'redux'
import Error from '_src/pages/error'
import BasicSection from '_src/components/section/basic'
import CopyrightFooter from '_src/components/copyright-footer'
import SectionsContainer from '_src/components/section/sections-container'
import DetailsContainer from '_src/components/entity/details-container'
import SectionHeading from '_src/components/section/heading'
import { ALLOWED_TAG_TYPES } from '_src/constants/tag'
import { deleteTag } from '_src/actions/tag'
import { getTagTypeFromLocation } from '_src/lib/tag'
import Loader from '_src/components/loader'
import TagsEditor from '_src/components/tags-editor'
import TagEditorForm from '_src/containers/forms/tag-editor'
import constraint from '_src/constants/tag-constraint'
import './index.scss'

class Tags extends React.Component {
  handleDeleteTag = id => {
    this.props.deleteTag({ id })
  }
  render () {
    const {
      getInProgress,
      getFailed,
      deleteInProgress,
      tagType,
      tags
    } = this.props

    if (getFailed) {
      return <Error statusCode={500} />
    }

    return (
      <SectionsContainer>
        <BasicSection>
          <SectionHeading logo={TagsIcon}>
            <span>{tagType}</span> Tags
          </SectionHeading>
          {getInProgress &&
            <DetailsContainer style={{ flexGrow: '1' }} type='narrow'>
              <Loader size='massive' />
            </DetailsContainer>}
          {!getInProgress &&
            !getFailed &&
            <DetailsContainer style={{ paddingBottom: '1rem' }}>
              <TagsEditor
                ref={ref => (this._tagsEditor = ref)}
                tagType={tagType}
                value={tags}
                onDelete={this.handleDeleteTag}
                formComponent={TagEditorForm}
                constraint={constraint}
                deleteInProgress={deleteInProgress}
              />
            </DetailsContainer>}
        </BasicSection>
        <CopyrightFooter />
      </SectionsContainer>
    )
  }
}

Tags.propTypes = {
  tagType: PropTypes.oneOf(ALLOWED_TAG_TYPES).isRequired,
  tags: PropTypes.array.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  getInProgress: PropTypes.bool.isRequired,
  getFailed: PropTypes.bool.isRequired,
  deleteInProgress: PropTypes.bool.isRequired,
  deleteTag: PropTypes.func.isRequired
}

export default connect(
  (state, ownProps) => ({
    tagType: getTagTypeFromLocation(ownProps.location),
    tags: state.tag[getTagTypeFromLocation(ownProps.location)],
    getInProgress: state.tag.getInProgress,
    getFailed: state.tag.getFailed,
    deleteInProgress: state.tag.deleteInProgress
  }),
  dispatch => ({
    deleteTag: bindActionCreators(deleteTag, dispatch)
  })
)(Tags)
