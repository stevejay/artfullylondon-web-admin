// @flow

import type { EventForEdit, OpeningTime, TagArray } from "../../flow-types";

import * as React from "react";
import isEmpty from "lodash/isEmpty";
import _ from "lodash";
import { pure } from "recompose";
import { Table, TableBody, TableRow, Paragraph } from "grommet";
import SectionHeading from "../section-heading";
import SubHeading from "./sub-heading";
import DayOrDateTableCell from "./day-or-date-table-cell";
import TimeRangeTableCell from "./time-range-table-cell";
import OpeningTimesTable from "./opening-times-table";
import Section from "./section";
import { getDateDisplayValue } from "../../utils/time";

type Props = {
  +event: EventForEdit
};

type GroupElementType = ?Array<{
  ...OpeningTime,
  +audienceTags?: ?TagArray
}>;

const EventOpeningTimes = ({
  event: {
    timesRanges,
    openingTimes,
    additionalOpeningTimes,
    specialOpeningTimes,
    openingTimesClosures,
    useVenueOpeningTimes
  }
}: Props) => (
  <React.Fragment>
    {useVenueOpeningTimes && (
      <Section>
        <SectionHeading title="Opening Times" />
        <Paragraph>Uses the venue&apos;s opening times.</Paragraph>
      </Section>
    )}
    {!useVenueOpeningTimes &&
      !isEmpty(openingTimes) && (
        <Section>
          <SectionHeading title="Opening Times" />
          {isEmpty(timesRanges) ? (
            <OpeningTimesTable openingTimes={openingTimes} />
          ) : (
            timesRanges.map(timesRange => (
              <React.Fragment>
                <SubHeading
                  label={`${timesRange.label}\u2014${getDateDisplayValue(
                    timesRange.dateFrom
                  )} to ${getDateDisplayValue(timesRange.dateTo)}`}
                />
                <OpeningTimesTable
                  openingTimes={openingTimes.filter(
                    element => element.timesRangeId === timesRange.id
                  )}
                />
              </React.Fragment>
            ))
          )}
        </Section>
      )}
    {!isEmpty(additionalOpeningTimes) && (
      <Section>
        <SectionHeading
          title={
            isEmpty(openingTimes) ? "Opening Times" : "Additional Opening Times"
          }
        />
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
    {!isEmpty(specialOpeningTimes) && (
      <Section>
        <SectionHeading title="Special Opening Times" />
        <Table>
          <TableBody>
            {_.map(
              _.groupBy(specialOpeningTimes, "date"),
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
    {!isEmpty(openingTimesClosures) && (
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
      </Section>
    )}
  </React.Fragment>
);

export default pure(EventOpeningTimes);
