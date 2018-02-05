import React from 'react'

// TODO try doing this like:
// https://github.com/facebook/react/blob/28aa084ad84a681be1c45def2f4b4c0dd8a43871/packages/react/src/ReactBaseClasses.js

export default class ShouldNotUpdateComponent extends React.Component {
  shouldComponentUpdate () {
    return false
  }
}
