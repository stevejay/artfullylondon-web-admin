// @flow

import type { FormikErrors } from "formik";

import * as React from "react";
import { pure } from "recompose";
import { Text } from "grommet";
import AnimationBox from "shared/animation-box";

const BOX_BACKGROUND = { color: "status-error", opacity: "weak" };
const BOX_PAD = { horizontal: "small", vertical: "xsmall" };
const BOX_MARGIN = { bottom: "medium" };

type Props = {
  +errors: FormikErrors<any>,
  +name: string
};

const Error = ({ errors, name }: Props) =>
  errors[name] ? (
    <AnimationBox
      animation="fadeIn"
      round="xsmall"
      background={BOX_BACKGROUND}
      pad={BOX_PAD}
      margin={BOX_MARGIN}
      role="alert"
    >
      <Text color="status-error">{errors[name]}</Text>
    </AnimationBox>
  ) : null;

export default pure(Error);
