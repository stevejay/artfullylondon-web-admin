// @flow

import type { DayOpeningTime, OpeningTime, TagArray } from "../../flow-types";

import * as React from "react";
import empty from "empty";
import _ from "lodash";
import { Table, TableBody, TableRow } from "grommet";
import DayOrDateTableCell from "./day-or-date-table-cell";
import TimeRangeTableCell from "./time-range-table-cell";
import { getDayDisplayValue } from "../../utils/time";

type Props = {
  +openingTimes: ?Array<DayOpeningTime>
};

type GroupElementType = ?Array<{
  ...OpeningTime,
  +audienceTags?: ?TagArray
}>;

const OpeningTimesTable = ({ openingTimes }: Props) => (
  <Table>
    <TableBody>
      {_.map(
        _.groupBy(openingTimes || empty.array, "day"),
        (value: GroupElementType, key) => (
          <TableRow key={key}>
            <DayOrDateTableCell label={getDayDisplayValue(parseInt(key, 10))} />
            <TimeRangeTableCell ranges={value} />
          </TableRow>
        )
      )}
    </TableBody>
  </Table>
);

export default OpeningTimesTable;
