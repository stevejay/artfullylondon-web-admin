// @flow

import * as React from "react";
import { Box } from "grommet";

type Props = {
  +animation:
    | void
    | string
    | string[]
    | {
        +type?: string,
        +duration?: number,
        +size?: string
      }
};

const AnimationBox =
  process.env.NODE_ENV === "test"
    ? (props: Props) => <Box {...props} animation={null} />
    : Box;

export default AnimationBox;
