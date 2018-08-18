// @flow

import * as React from "react";
import { Button, Text } from "grommet";
import styled from "styled-components";
import AnimationBox from "shared/animation-box";

const StyledBox = styled(AnimationBox)`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
`;

type Props = {|
  +onUpdate: void => void
|};

const UpdateMessage = ({ onUpdate }: Props) => (
  <StyledBox
    animation="fadeIn"
    pad={{ horizontal: "medium", vertical: "xsmall" }}
    responsive
    background="accent-1"
    align="center"
  >
    <Button plain onClick={onUpdate}>
      <Text color="light-1" weight="bold">
        New version available! Click here to update
      </Text>
    </Button>
  </StyledBox>
);

export default UpdateMessage;
