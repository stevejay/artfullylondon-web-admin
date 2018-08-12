// @flow

import * as React from "react";
import { Box } from "grommet";

const BOX_BORDER = { side: "all", color: "brand", size: "xsmall" };
const BOX_PAD = { horizontal: "medium", top: "medium", bottom: "xsmall" };
const BOX_MARGIN = { bottom: "medium" };

type Props = {
  +children: React.Node
};

const AsideContainer = ({ children }: Props) => (
  <Box
    pad={BOX_PAD}
    border={BOX_BORDER}
    margin={BOX_MARGIN}
    round="xsmall"
    responsive
  >
    {children}
  </Box>
);

export default AsideContainer;
