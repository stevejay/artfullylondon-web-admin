import React from 'react'

// TODO there may be a more efficient way of doing this,
// using prototype manipulation.
class ShouldNeverUpdateComponent extends React.Component {
  shouldComponentUpdate () {
    return false
  }
}

export default ShouldNeverUpdateComponent
