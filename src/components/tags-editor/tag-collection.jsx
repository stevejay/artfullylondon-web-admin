import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import NoEntries from '_src/components/no-entries'
import Tag from './tag'
import './tag-collection.scss'

class TagCollection extends React.Component {
  constructor (props) {
    super(props)
    this.state = { deletingTagId: null }
  }
  shouldComponentUpdate (nextProps, nextState) {
    return (
      nextProps.value !== this.props.value ||
      nextProps.deleteInProgress !== this.props.deleteInProgress ||
      nextState.deletingTagId !== this.state.deletingTagId
    )
  }
  handleDelete = key => {
    this.setState({ deletingTagId: key })
    this.props.onDelete(key)
  }
  render () {
    const { value, deleteInProgress } = this.props
    const { deletingTagId } = this.state

    if (_.isEmpty(value)) {
      return <NoEntries />
    } else {
      return (
        <div styleName='container'>
          {value.map(x => (
            <Tag
              key={x.id}
              value={x}
              onDelete={this.handleDelete}
              isBeingDeleted={deleteInProgress && deletingTagId === x.id}
            />
          ))}
        </div>
      )
    }
  }
}

TagCollection.propTypes = {
  value: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  deleteInProgress: PropTypes.bool.isRequired
}

export default TagCollection
