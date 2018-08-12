// @flow

import type { Performance, TagArray } from "../../flow-types";

import * as React from "react";
import isEmpty from "lodash/isEmpty";
import { TableCell, Text } from "grommet";
import Tag from "../tag";
import { getTimeAtDisplayValue } from "../../utils/time";

type Props = {
  +ranges: ?Array<{
    ...Performance,
    +audienceTags?: ?TagArray
  }>
};

const TimeAtTableCell = ({ ranges }: Props) =>
  ranges ? (
    <TableCell verticalAlign="top">
      {ranges.map(range => (
        <Text key={range.at || "day"}>
          {getTimeAtDisplayValue(range.at)}
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

export default TimeAtTableCell;
