// @flow

import * as React from "react";
import { Box } from "grommet";
import Definition from "./definition";

type Props = {| +a11yTitle?: string, +children: React.Node |};

const DefinitionList = ({ a11yTitle, children }: Props) => (
  <Box tag="dl" flex fill responsive a11yTitle={a11yTitle}>
    {children}
  </Box>
);

DefinitionList.Definition = Definition;
export default DefinitionList;
