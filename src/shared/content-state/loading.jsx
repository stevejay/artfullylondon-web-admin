// @flow

import * as React from "react";
import { shouldUpdate } from "recompose";
import { InProgress } from "grommet-icons";
import AnimationBox from "shared/animation-box";
import ContextBox from "./content-box";

const ANIMATION = { type: "pulse", duration: 500, size: "large" };

const LoadingContentState = () => (
  <ContextBox aria-busy role="alert">
    <AnimationBox animation={ANIMATION}>
      <InProgress
        size="large"
        color="light-4"
        role="presentation"
        aria-hidden
      />
    </AnimationBox>
  </ContextBox>
);

export default shouldUpdate(() => false)(LoadingContentState);
