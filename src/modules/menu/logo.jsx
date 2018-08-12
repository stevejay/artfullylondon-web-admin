// @flow

import * as React from "react";
import styled from "styled-components";
import { shouldUpdate } from "recompose";
import ExtendedRoutedAnchor from "shared/scroll/extended-routed-anchor";
import ExtendedHeading from "shared/extended-heading";

const StyledHeading = styled(ExtendedHeading)`
  margin-right: auto;
  line-height: 0.9 !important;
  font-size: 30px !important;
`;

type Props = {
  +onClick?: void => void
};

const Logo = ({ onClick }: Props) => (
  <StyledHeading
    level={2}
    responsive
    size="medium"
    textAlign="left"
    margin="none"
    textTransform="uppercase"
  >
    <ExtendedRoutedAnchor
      plain
      path="/"
      aria-label="Go to Dashboard page"
      onClick={onClick}
    >
      Artfully
      <br />
      Admin
    </ExtendedRoutedAnchor>
  </StyledHeading>
);

export default shouldUpdate(() => false)(Logo);
