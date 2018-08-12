// @flow

import * as React from "react";
import { Box } from "grommet";

const BOX_MARGIN = { bottom: "small" };

type Props = {
  +children: React.Node
};

const Section = ({ children }: Props) => (
  <Box tag="section" margin={BOX_MARGIN}>
    {children}
  </Box>
);

export default Section;
