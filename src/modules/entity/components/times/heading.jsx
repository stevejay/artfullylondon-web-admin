// @flow

import * as React from "react";
import { Heading as GrommetHeading } from "grommet";

const HEADING_MARGIN = { top: "none", bottom: "small" };

type Props = {
  +label: string
};

const Heading = ({ label }: Props) => (
  <GrommetHeading level={3} responsive margin={HEADING_MARGIN}>
    {label}
  </GrommetHeading>
);

export default Heading;
