// @flow

import * as React from "react";
import { withStateHandlers } from "recompose";
import * as eventEmitter from "shared/utils/event-emitter";

// TODO display proper content on new content available.

type EnhancedProps = {
  newContentAvailable: boolean,
  setNewContentAvailable: void => void
};

class Updater extends React.Component<EnhancedProps> {
  constructor(props: EnhancedProps) {
    super(props);
    eventEmitter.addListener("swState", this.props.setNewContentAvailable);
  }
  componentWillUnmount() {
    eventEmitter.removeListener("swState", this.props.setNewContentAvailable);
  }
  render() {
    return this.props.newContentAvailable ? (
      <div style={{ backgroundColor: "red", color: "white" }}>
        New content available
      </div>
    ) : null;
  }
}

export default withStateHandlers(
  { newContentAvailable: false },
  {
    setNewContentAvailable: () => () => ({ newContentAvailable: true })
  }
)(Updater);
