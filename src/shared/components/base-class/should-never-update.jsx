import React from 'react'

class ShouldNeverUpdateComponent extends React.Component {
  shouldComponentUpdate () {
    return false
  }
}

export default ShouldNeverUpdateComponent
