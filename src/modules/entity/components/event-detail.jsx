// @flow

import type { EventForEdit } from "../flow-types";

import * as React from "react";
import isEmpty from "lodash/isEmpty";
import { Box } from "grommet";
import {
  Calendar,
  Scorecard,
  Ticket,
  Tag,
  Edit,
  Home,
  Clock,
  User,
  Sort as EventSeriesIcon,
  History,
  StatusUnknown
} from "grommet-icons";
import * as entityType from "shared/types/entity-type";
import ExtendedRoutedAnchor from "shared/scroll/extended-routed-anchor";
import RestoreScroll from "shared/scroll/restore-scroll";
import Column from "shared/column";
import Header from "./header";
import Description from "./description";
import Notes from "./notes";
import Aside from "./aside";
import Summary from "./summary";
import Rating from "./rating";
import TagList from "./tag-list";
import EventOpeningTimes from "./times/event-opening-times";
import EventPerformances from "./times/event-performances";
import IconLinkList from "./icon-link-list";
// import TalentList from "./talent-list";
import TalentCard from "./talent-card";
import {
  getCostDisplayValue,
  getOccurrenceDisplayValue,
  getBookingDisplayValue,
  getDurationDisplayValue,
  getAgeDisplayValue,
  getEnumDisplayValue
} from "../utils/entity";
import * as eventType from "../types/event-type";

type Props = {
  +event: EventForEdit,
  +onEdit: void => void
};

const EventDetail = ({ event, onEdit }: Props) => (
  <React.Fragment>
    <RestoreScroll />
    <Header
      entityType={entityType.EVENT}
      id={event.id}
      name={event.name}
      subTitle={getEnumDisplayValue(event.eventType)}
      images={event.images}
      onEdit={onEdit}
    />
    <Column.Container>
      <Column basis="2/3">
        <Summary summary={event.summary} />
        <IconLinkList links={event.links} entityType={entityType.EVENT} />
        <Description
          description={event.description}
          descriptionCredit={event.descriptionCredit}
          weSay={event.weSay}
        />
        <Notes notes={event.notes} />
        {event.eventType === eventType.EXHIBITION ? (
          <EventOpeningTimes event={event} />
        ) : (
          <EventPerformances event={event} />
        )}
        {!isEmpty(event.talents) && (
          <Box wrap flex direction="row-responsive" responsive>
            {event.talents.map(talent => <TalentCard talent={talent} />)}
          </Box>
        )}
      </Column>
      <Column basis="1/3">
        <Aside.Container>
          <Aside icon={History} title="Version">
            Version {event.version}
          </Aside>
          <Aside icon={StatusUnknown} title="Status">
            {getEnumDisplayValue(event.status)}
          </Aside>
          <Aside icon={Home} title="Venue">
            <ExtendedRoutedAnchor path={"/" + event.venue.id}>
              {event.venue.name}
            </ExtendedRoutedAnchor>
            {event.venueGuidance && (
              <React.Fragment>
                <br />
                Note: {event.venueGuidance}
              </React.Fragment>
            )}
          </Aside>
          <Aside icon={Calendar} title="Occurrence">
            {getOccurrenceDisplayValue(
              event.occurrenceType,
              event.dateFrom,
              event.dateTo,
              event.eventType
            )}
          </Aside>
          <Aside icon={Ticket} title="Cost">
            {getCostDisplayValue(event.costType, event.costFrom, event.costTo)}
          </Aside>
          <Aside icon={Edit} title="Booking">
            {getBookingDisplayValue(
              event.bookingType,
              event.soldOut,
              event.bookingOpens
            )}
          </Aside>
          {event.duration && (
            <Aside icon={Clock} title="Duration">
              {getDurationDisplayValue(event.duration, event.eventType)}
            </Aside>
          )}
          {(event.minAge || event.maxAge) && (
            <Aside icon={User} title="Age">
              {getAgeDisplayValue(event.minAge, event.maxAge)}
            </Aside>
          )}
          {event.eventSeries && (
            <Aside icon={EventSeriesIcon} title="Event Series">
              Part of the{" "}
              <ExtendedRoutedAnchor path={"/" + event.eventSeries.id}>
                {event.eventSeries.name}
              </ExtendedRoutedAnchor>{" "}
              event series
            </Aside>
          )}
          <Aside icon={Scorecard} title="Our rating">
            <Rating rating={event.rating} />
          </Aside>
          <Aside icon={Tag} title="Tags">
            <TagList
              mediumTags={event.mediumTags}
              styleTags={event.styleTags}
              audienceTags={event.audienceTags}
              geoTags={event.geoTags}
            />
          </Aside>
        </Aside.Container>
      </Column>
    </Column.Container>
  </React.Fragment>
);

export default EventDetail;
