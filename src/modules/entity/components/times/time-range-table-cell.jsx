// @flow

import type { OpeningTime, TagArray } from "../../flow-types";

import * as React from "react";
import isEmpty from "lodash/isEmpty";
import { TableCell, Text } from "grommet";
import Tag from "../tag";
import { getTimeRangeDisplayValue } from "../../utils/time";

type Props = {
  +ranges: ?Array<{
    ...OpeningTime,
    +audienceTags?: ?TagArray
  }>
};

const TimeRangeTableCell = ({ ranges }: Props) =>
  ranges ? (
    <TableCell verticalAlign="top">
      {ranges.map(range => (
        <Text key={range.from || "day"}>
          {getTimeRangeDisplayValue(range.from, range.to)}
          {!isEmpty(range.audienceTags) &&
            range.audienceTags.map(tag => (
              <Tag key={tag.id} label={tag.label} />
            ))}
          {/* {!isEmpty(range.audienceTags) && (
            <Box direction="row" wrap alignContent="start" responsive flex>
              {range.audienceTags.map(tag => (
                <Tag key={tag.id} label={tag.label} />
              ))}
            </Box>
          )} */}
        </Text>
      ))}
    </TableCell>
  ) : null;

export default TimeRangeTableCell;
