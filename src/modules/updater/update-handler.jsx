// @flow

import * as React from "react";
import { withStateHandlers, pure, compose } from "recompose";
import window from "global/window";
import * as eventEmitter from "shared/utils/event-emitter";
import UpdateMessage from "./update-message";

type Props = {|
  +newContentAvailable: boolean,
  +setNewContentAvailable: void => void
|};

class UpdateHandler extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    eventEmitter.addListener("swState", this.props.setNewContentAvailable);
  }
  componentWillUnmount() {
    eventEmitter.removeListener("swState", this.props.setNewContentAvailable);
  }
  handleUpdate = () => {
    window.location.reload(false);
  };
  render() {
    return this.props.newContentAvailable ? (
      <UpdateMessage onUpdate={this.handleUpdate} />
    ) : null;
  }
}

// TODO work out why I had to resort to 'any' here:
const enhancer: any = compose(
  withStateHandlers(
    { newContentAvailable: false },
    {
      setNewContentAvailable: () => () => ({ newContentAvailable: true })
    }
  ),
  pure
);

export default enhancer(UpdateHandler);
