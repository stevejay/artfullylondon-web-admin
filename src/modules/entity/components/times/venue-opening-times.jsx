// @flow

import type { VenueForEdit, OpeningTime, TagArray } from "../../flow-types";

import * as React from "react";
import isEmpty from "lodash/isEmpty";
import _ from "lodash";
import { pure } from "recompose";
import { Table, TableBody, TableRow, TableCell, Text } from "grommet";
import DayOrDateTableCell from "./day-or-date-table-cell";
import TimeRangeTableCell from "./time-range-table-cell";
import OpeningTimesTable from "./opening-times-table";
import Section from "./section";
import SectionHeading from "../section-heading";
import {
  getDateDisplayValue,
  getNamedClosureDisplayValue
} from "../../utils/time";

type Props = {
  +venue: VenueForEdit
};

type GroupElementType = ?Array<{
  ...OpeningTime,
  +audienceTags?: ?TagArray
}>;

const VenueOpeningTimes = ({
  venue: {
    openingTimes,
    additionalOpeningTimes,
    openingTimesClosures,
    namedClosures
  }
}: Props) => {
  if (isEmpty(openingTimes) && isEmpty(additionalOpeningTimes)) {
    return null;
  }
  return (
    <React.Fragment>
      {!isEmpty(openingTimes) && (
        <Section>
          <SectionHeading title="Opening Times" />
          <OpeningTimesTable openingTimes={openingTimes} />
        </Section>
      )}
      {!isEmpty(additionalOpeningTimes) && (
        <Section>
          <SectionHeading title="Additional Opening Times" />
          <Table>
            <TableBody>
              {_.map(
                _.groupBy(additionalOpeningTimes, "date"),
                (value: GroupElementType, key) => (
                  <TableRow key={key}>
                    <DayOrDateTableCell label={getDateDisplayValue(key)} />
                    <TimeRangeTableCell ranges={value} />
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </Section>
      )}
      {(!isEmpty(openingTimesClosures) || !isEmpty(namedClosures)) && (
        <Section>
          <SectionHeading title="Closures" />
          <Table>
            <TableBody>
              {_.map(
                _.groupBy(openingTimesClosures, "date"),
                (value: GroupElementType, key) => (
                  <TableRow key={key}>
                    <DayOrDateTableCell label={getDateDisplayValue(key)} />
                    <TimeRangeTableCell ranges={value} />
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
          <Table>
            <TableBody>
              {_.map(namedClosures, element => (
                <TableRow key={element}>
                  <TableCell verticalAlign="top">
                    <Text>{getNamedClosureDisplayValue(element)}</Text>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Section>
      )}
    </React.Fragment>
  );
};

export default pure(VenueOpeningTimes);
