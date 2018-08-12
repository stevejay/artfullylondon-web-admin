// @flow

import * as React from "react";
import * as swivel from "swivel";
import { withStateHandlers } from "recompose";

// TODO display proper content on new content available.

type EnhancedProps = {
  newContentAvailable: boolean,
  setNewContentAvailable: void => void
};

class Updater extends React.Component<EnhancedProps> {
  constructor(props: EnhancedProps) {
    super(props);
    swivel.on("swState", ({ newContentAvailable }) => {
      if (newContentAvailable) {
        this.props.setNewContentAvailable();
      }
    });
  }
  render() {
    return this.props.newContentAvailable ? (
      <div>New content available</div>
    ) : null;
  }
}

export default withStateHandlers(
  { newContentAvailable: false },
  {
    setNewContentAvailable: () => () => ({ newContentAvailable: true })
  }
)(Updater);
