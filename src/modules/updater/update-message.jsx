// @flow

import * as React from "react";
import { Paragraph, Button } from "grommet";
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
    pad="medium"
    responsive
    background="light-2"
    direction="row-responsive"
    align="center"
    justify="between"
    border={{ side: "top", size: "xsmall", color: "dark-2" }}
  >
    <Paragraph>
      A <strong>new version</strong> of the app is available!
    </Paragraph>
    <Button label="Update" onClick={onUpdate} data-test="update-app" />
  </StyledBox>
);

export default UpdateMessage;
