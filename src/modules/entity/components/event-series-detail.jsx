// @flow

import type { EventSeriesForEdit } from "../flow-types";

import * as React from "react";
import { History, StatusUnknown, Clock } from "grommet-icons";
import * as entityType from "shared/types/entity-type";
import RestoreScroll from "shared/scroll/restore-scroll";
import Column from "shared/column";
import Header from "./header";
import Description from "./description";
import Notes from "./notes";
import Aside from "./aside";
import Summary from "./summary";
import IconLinkList from "./icon-link-list";
import { getEnumDisplayValue } from "../utils/entity";

type Props = {
  +eventSeries: EventSeriesForEdit,
  +onEdit: void => void
};

const EventSeriesDetail = ({ eventSeries, onEdit }: Props) => (
  <React.Fragment>
    <RestoreScroll />
    <Header
      entityType={entityType.EVENT_SERIES}
      id={eventSeries.id}
      name={eventSeries.name}
      subTitle={getEnumDisplayValue(eventSeries.eventSeriesType)}
      images={eventSeries.images}
      onEdit={onEdit}
    />
    <Column.Container>
      <Column basis="2/3">
        <Summary summary={eventSeries.summary} />
        <Description
          description={eventSeries.description}
          descriptionCredit={eventSeries.descriptionCredit}
          weSay={eventSeries.weSay}
        />
        <Notes notes={eventSeries.notes} />
      </Column>
      <Column basis="1/3">
        <Aside.Container>
          <Aside icon={History} title="Version">
            Version {eventSeries.version}
          </Aside>
          <Aside icon={StatusUnknown} title="Status">
            {getEnumDisplayValue(eventSeries.status)}
          </Aside>
          <Aside icon={Clock} title="Occurrence">
            {eventSeries.occurrence}
          </Aside>
        </Aside.Container>
        <IconLinkList
          links={eventSeries.links}
          entityType={entityType.EVENT_SERIES}
        />
      </Column>
    </Column.Container>
  </React.Fragment>
);

export default EventSeriesDetail;
