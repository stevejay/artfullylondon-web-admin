// @flow

import type { EventForEdit, Performance, TagArray } from "../../flow-types";

import * as React from "react";
import isEmpty from "lodash/isEmpty";
import _ from "lodash";
import { pure } from "recompose";
import { Table, TableBody, TableRow } from "grommet";
import SectionHeading from "../section-heading";
import SubHeading from "./sub-heading";
import DayOrDateTableCell from "./day-or-date-table-cell";
import TimeAtTableCell from "./time-at-table-cell";
import PerformancesTable from "./performances-table";
import Section from "./section";
import { getDateDisplayValue } from "../../utils/time";

type Props = {
  +event: EventForEdit
};

type GroupElementType = ?Array<{
  ...Performance,
  +audienceTags?: ?TagArray
}>;

const EventPerformances = ({
  event: {
    timesRanges,
    performances,
    additionalPerformances,
    specialPerformances,
    performancesClosures,
    soldOutPerformances
  }
}: Props) => (
  <React.Fragment>
    {!isEmpty(performances) && (
      <Section>
        <SectionHeading title="Performances" />
        {isEmpty(timesRanges) ? (
          <PerformancesTable performances={performances} />
        ) : (
          timesRanges.map(timesRange => (
            <React.Fragment>
              <SubHeading
                label={`${timesRange.label}\u2014${getDateDisplayValue(
                  timesRange.dateFrom
                )} to ${getDateDisplayValue(timesRange.dateTo)}`}
              />
              <PerformancesTable
                performances={performances.filter(
                  element => element.timesRangeId === timesRange.id
                )}
              />
            </React.Fragment>
          ))
        )}
      </Section>
    )}
    {!isEmpty(additionalPerformances) && (
      <Section>
        <SectionHeading
          title={
            isEmpty(performances) ? "Performances" : "Additional Performances"
          }
        />
        <Table>
          <TableBody>
            {_.map(
              _.groupBy(additionalPerformances, "date"),
              (value: GroupElementType, key) => (
                <TableRow key={key}>
                  <DayOrDateTableCell label={getDateDisplayValue(key)} />
                  <TimeAtTableCell ranges={value} />
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </Section>
    )}
    {!isEmpty(specialPerformances) && (
      <Section>
        <SectionHeading title="Special Performances" />
        <Table>
          <TableBody>
            {_.map(
              _.groupBy(specialPerformances, "date"),
              (value: GroupElementType, key) => (
                <TableRow key={key}>
                  <DayOrDateTableCell label={getDateDisplayValue(key)} />
                  <TimeAtTableCell ranges={value} />
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </Section>
    )}
    {!isEmpty(performancesClosures) && (
      <Section>
        <SectionHeading title="Closures" />
        <Table>
          <TableBody>
            {_.map(
              _.groupBy(performancesClosures, "date"),
              (value: GroupElementType, key) => (
                <TableRow key={key}>
                  <DayOrDateTableCell label={getDateDisplayValue(key)} />
                  <TimeAtTableCell ranges={value} />
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </Section>
    )}
    {!isEmpty(soldOutPerformances) && (
      <Section>
        <SectionHeading title="Sold Out Performances" />
        <Table>
          <TableBody>
            {_.map(
              _.groupBy(performancesClosures, "date"),
              (value: GroupElementType, key) => (
                <TableRow key={key}>
                  <DayOrDateTableCell label={getDateDisplayValue(key)} />
                  <TimeAtTableCell ranges={value} />
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </Section>
    )}
  </React.Fragment>
);

export default pure(EventPerformances);
