// @flow

import type { Location, RouterHistory } from "react-router-dom";

import * as React from "react";
import { withRouter } from "react-router-dom";
import window from "global/window";

type Props = {
  +location: Location,
  +history: RouterHistory
};

class RestoreScroll extends React.Component<Props> {
  componentDidMount() {
    if (this.props.location.state) {
      const { scrollY } = this.props.location.state;
      window && window.scrollTo(0, scrollY || 0);
    } else {
      window && window.scrollTo(0, 0);
    }
  }
  render() {
    return null;
  }
}

export default withRouter(RestoreScroll);
