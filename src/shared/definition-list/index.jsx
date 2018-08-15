// @flow

import * as React from "react";
import { Box } from "grommet";
import Definition from "./definition";

type Props = {| +children: React.Node |};

const DefinitionList = ({ children }: Props) => (
  <Box tag="dl" flex fill responsive>
    {children}
  </Box>
);

DefinitionList.Definition = Definition;
export default DefinitionList;
