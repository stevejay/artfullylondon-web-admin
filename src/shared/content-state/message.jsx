// @flow

import * as React from "react";
import { shouldUpdate } from "recompose";
import { Text } from "grommet";
import AnimationBox from "shared/animation-box";
import ContextBox from "./content-box";

const ANIMATION = ["zoomIn", "fadeIn"];
const BOX_PAD = { vertical: "xsmall", horizontal: "large" };

type Props = {
  +message: string
};

const MessageContentState = ({ message }: Props) => (
  <ContextBox>
    <AnimationBox
      direction="column"
      align="center"
      animation={ANIMATION}
      pad={BOX_PAD}
      background="light-3"
      round="large"
      responsive
      role="alert"
    >
      <Text tag="h1" size="medium" color="dark-6" weight="bold">
        {message}
      </Text>
    </AnimationBox>
  </ContextBox>
);

export default shouldUpdate(() => false)(MessageContentState);
