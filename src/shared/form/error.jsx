// @flow

import * as React from "react";
import { pure } from "recompose";
import { Text } from "grommet";
import AnimationBox from "shared/animation-box";

const BOX_BACKGROUND = { color: "status-error", opacity: "weak" };
const BOX_PAD = { horizontal: "small", vertical: "xsmall" };
const BOX_MARGIN = { top: "small" };

type Props = {|
  +errors?: { [key: string]: any },
  +name: string
|};

const Error = ({ errors, name }: Props) =>
  errors && errors[name] ? (
    <AnimationBox
      animation="fadeIn"
      round="xsmall"
      background={BOX_BACKGROUND}
      pad={BOX_PAD}
      margin={BOX_MARGIN}
      role="alert"
    >
      <Text color="status-error" weight="bold">
        {errors[name]}
      </Text>
    </AnimationBox>
  ) : null;

export default pure(Error);
