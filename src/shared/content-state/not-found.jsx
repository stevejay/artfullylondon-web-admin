// @flow

import * as React from "react";
import { shouldUpdate } from "recompose";
import { Text } from "grommet";
import { DocumentMissing } from "grommet-icons";
import AnimationBox from "shared/animation-box";
import ContextBox from "./content-box";

const ANIMATION = ["zoomIn", "fadeIn"];

const NotFoundContentState = () => (
  <ContextBox>
    <AnimationBox
      animation={ANIMATION}
      direction="column"
      align="center"
      role="alert"
    >
      <DocumentMissing
        size="xlarge"
        color="status-critical"
        role="presentation"
        aria-hidden
      />
      <Text tag="h1" size="xlarge" color="status-critical" weight="bold">
        Not Found
      </Text>
    </AnimationBox>
  </ContextBox>
);

export default shouldUpdate(() => false)(NotFoundContentState);
