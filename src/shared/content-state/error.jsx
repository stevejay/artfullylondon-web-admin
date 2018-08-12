// @flow

import * as React from "react";
import { shouldUpdate } from "recompose";
import { StatusCritical } from "grommet-icons";
import AnimationBox from "shared/animation-box";
import ContextBox from "./content-box";

const ANIMATION = ["zoomIn", "fadeIn"];

const ErrorContentState = () => (
  <ContextBox>
    <AnimationBox
      animation={ANIMATION}
      direction="column"
      align="center"
      role="alert"
      aria-label="An error occurred"
    >
      <StatusCritical
        size="xlarge"
        color="status-critical"
        role="presentation"
        aria-hidden
      />
    </AnimationBox>
  </ContextBox>
);

export default shouldUpdate(() => false)(ErrorContentState);
