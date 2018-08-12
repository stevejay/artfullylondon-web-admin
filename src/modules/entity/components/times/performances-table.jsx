// @flow

import type { DayPerformance, Performance, TagArray } from "../../flow-types";

import * as React from "react";
import _ from "lodash";
import { pure } from "recompose";
import { Table, TableBody, TableRow } from "grommet";
import DayOrDateTableCell from "./day-or-date-table-cell";
import TimeAtTableCell from "./time-at-table-cell";
import { getDayDisplayValue } from "../../utils/time";

type Props = {
  +performances: ?Array<DayPerformance>
};

type GroupElementType = ?Array<{
  ...Performance,
  +audienceTags?: ?TagArray
}>;

const PerformancesTable = ({ performances }: Props) =>
  _.isEmpty(performances) ? null : (
    <Table>
      <TableBody>
        {_.map(
          _.groupBy(performances, "day"),
          (value: GroupElementType, key) => (
            <TableRow key={key}>
              <DayOrDateTableCell
                label={getDayDisplayValue(parseInt(key, 10))}
              />
              <TimeAtTableCell ranges={value} />
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );

export default pure(PerformancesTable);
