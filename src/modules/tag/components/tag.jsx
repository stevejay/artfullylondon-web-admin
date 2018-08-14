// @flow

import * as React from "react";
import { pure } from "recompose";
import { Text, Button } from "grommet";
import { FormClose } from "grommet-icons";
import AnimationBox from "shared/animation-box";

const DeleteIcon = <FormClose size="small" color="status-error" />;
const BOX_PAD = { vertical: "xsmall", horizontal: "medium" };

type Props = {|
  +tagType: string,
  +tagId?: string,
  +label: string,
  +onClick: ?(void) => void
|};

const Tag = ({ tagType, tagId, label, onClick }: Props) => (
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
    data-test={tagId}
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
