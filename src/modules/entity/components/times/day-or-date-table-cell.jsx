// @flow

import * as React from "react";
import { TableCell, Text } from "grommet";

type Props = {
  +label: string
};

const DayOrDateTableCell = ({ label }: Props) => (
  <TableCell verticalAlign="top">
    <Text>{label}</Text>
  </TableCell>
);

export default DayOrDateTableCell;
