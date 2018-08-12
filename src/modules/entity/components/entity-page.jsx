// @flow

import * as React from "react";
import { pure } from "recompose";
import RestoreScroll from "shared/scroll/restore-scroll";
import EventDetailHandler from "./event-detail-handler";
import EventSeriesDetailHandler from "./event-series-detail-handler";
import TalentDetailHandler from "./talent-detail-handler";
import VenueDetailHandler from "./venue-detail-handler";

// Required type as react-router-dom Match type
// does not support param array indexing.
type Match = {
  params: { [key: string | number]: ?string },
  isExact: boolean,
  path: string,
  url: string
};

type Props = {
  +match: Match
};

const EntityPage = ({ match }: Props) => {
  const entity = (match.params.entityType || "").toLowerCase();
  const id = `${entity}/${match.params[0] || ""}`;
  return (
    <React.Fragment>
      <RestoreScroll />
      {entity === "event" && <EventDetailHandler id={id} />}
      {entity === "event-series" && <EventSeriesDetailHandler id={id} />}
      {entity === "talent" && <TalentDetailHandler id={id} />}
      {entity === "venue" && <VenueDetailHandler id={id} />}
    </React.Fragment>
  );
};

export default pure(EntityPage);
