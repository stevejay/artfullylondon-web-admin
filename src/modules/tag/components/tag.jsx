// @flow

import type { Tag as TagType } from "../flow-types";

import * as React from "react";
import { pure } from "recompose";
import { Text, Button } from "grommet";
import { FormClose } from "grommet-icons";
import AnimationBox from "shared/animation-box";

const DeleteIcon = <FormClose size="small" color="status-error" />;
const BOX_PAD = { vertical: "xsmall", horizontal: "medium" };

type Props = {
  ...TagType,
  +onClick: ?(void) => void
};

const Tag = ({ tagType, id, label, onClick }: Props) => (
  <AnimationBox
    animation="fadeIn"
    tag="li"
    direction="row"
    align="center"
    background="light-3"
    flex="shrink"
    justify="between"
    margin="xsmall"
    pad={BOX_PAD}
    responsive
    round="large"
    data-test={id}
  >
    <Text>{label}</Text>
    <Button
      plain
      focusIndicator
      icon={DeleteIcon}
      a11yTitle={`Delete the ${tagType} tag called ${label}`}
      onClick={onClick}
    />
  </AnimationBox>
);

export default pure(Tag);
