// @flow

import * as React from "react";
import { Box } from "grommet";

const BOX_STYLE = { minHeight: 200 };

type Props = {
  +children: React.Node
};

const ContextBox = ({ children, ...rest }: Props) => (
  <Box {...rest} align="center" justify="center" flex fill style={BOX_STYLE}>
    {children}
  </Box>
);

export default ContextBox;
