// @flow

import * as React from "react";
import { Text } from "grommet";
import AnimationBox from "shared/animation-box";

const BOX_PAD = { vertical: "hair", horizontal: "small" };
const BOX_MARGIN = { right: "xsmall", bottom: "xsmall" };

type Props = {
  +label: string
};

const Tag = ({ label }: Props) => (
  <AnimationBox
    animation="fadeIn"
    tag="span"
    direction="row"
    align="center"
    background="light-3"
    flex="shrink"
    justify="between"
    margin={BOX_MARGIN}
    pad={BOX_PAD}
    responsive={false}
    round="large"
  >
    <Text>{label}</Text>
  </AnimationBox>
);

export default Tag;
