// @flow

import * as React from "react";
import { Box } from "grommet";

const BOX_PAD = { vertical: "none", horizontal: "medium" };
const BOX_STYLE = { alignSelf: "center" };

type Props = {
  +children: React.Node
};

const ColumnContainer = ({ children }: Props) => (
  <Box align="start" responsive pad={BOX_PAD} width="xlarge" style={BOX_STYLE}>
    <Box direction="row-responsive" responsive fill>
      {children}
    </Box>
  </Box>
);

export default ColumnContainer;
