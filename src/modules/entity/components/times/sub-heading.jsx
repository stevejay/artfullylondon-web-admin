// @flow

import * as React from "react";
import { Heading } from "grommet";

const HEADING_MARGIN = { top: "none", bottom: "xsmall" };

type Props = {
  +label: string
};

const SubHeading = ({ label }: Props) => (
  <Heading level={4} responsive margin={HEADING_MARGIN}>
    {label}
  </Heading>
);

export default SubHeading;
