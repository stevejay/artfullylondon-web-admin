// @flow

import * as React from "react";
import styled from "styled-components";
import { Box } from "grommet";
import ColumnContainer from "./container";

const ColumnBox = styled(Box)`
  @media only screen and (max-width: 699px) {
    flex-basis: auto !important;
  }
`;

const BOX_PAD = { vertical: "large", horizontal: "medium" };
const BOX_STYLE = { minWidth: 250 };

type Props = {
  +basis: string,
  +children: React.Node
};

const Column = ({ basis, children }: Props) => (
  <ColumnBox
    direction="column"
    responsive
    pad={BOX_PAD}
    basis={basis}
    flex={true}
    style={BOX_STYLE}
  >
    {children}
  </ColumnBox>
);

Column.Container = ColumnContainer;
export default Column;
