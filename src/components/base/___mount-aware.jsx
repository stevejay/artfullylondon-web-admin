import React from 'react'

export class MountAwareComponent extends React.Component {
  constructor (props) {
    super(props)
    this._mounted = true
  }
  componentWillUnmount () {
    this._mounted = false
  }
  isMounted () {
    return this._mounted
  }
}
