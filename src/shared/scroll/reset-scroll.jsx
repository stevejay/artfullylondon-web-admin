// @flow

import * as React from "react";
import window from "global/window";

class ResetScroll extends React.Component<{}> {
  componentDidMount() {
    window && window.scrollTo(0, 0);
  }
  render() {
    return null;
  }
}

export default ResetScroll;
