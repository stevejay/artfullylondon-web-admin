// @flow

import type { VenueForEdit } from "../flow-types";

import * as React from "react";
import { pure } from "recompose";
import {
  Volume as Telephone,
  Send as Email,
  Location as Address,
  CircleInformation as Info,
  History,
  StatusUnknown
} from "grommet-icons";
import * as entityType from "shared/types/entity-type";
import RestoreScroll from "shared/scroll/restore-scroll";
import ExtendedAnchor from "shared/extended-anchor";
import Header from "./header";
import Description from "./description";
import Notes from "./notes";
import StaticMap from "./static-map";
import Column from "./column";
import VenueOpeningTimes from "./times/venue-opening-times";
import DisabilityAccess from "./disability-access";
import Aside from "./aside";
import IconLinkList from "./icon-link-list";
import { getEnumDisplayValue } from "../utils/entity";

type Props = {
  +venue: VenueForEdit,
  +onEdit: void => void
};

const VenueDetail = ({ venue, onEdit }: Props) => (
  <React.Fragment>
    <RestoreScroll />
    <Header
      entityType={entityType.VENUE}
      id={venue.id}
      name={venue.name}
      subTitle={getEnumDisplayValue(venue.venueType)}
      images={venue.images}
      onEdit={onEdit}
    />
    <Column.Container>
      <Column basis="2/3">
        <Description
          description={venue.description}
          descriptionCredit={venue.descriptionCredit}
          weSay={venue.weSay}
        />
        <Notes notes={venue.notes} />
        <StaticMap latitude={venue.latitude} longitude={venue.longitude} />
        <VenueOpeningTimes venue={venue} />
      </Column>
      <Column basis="1/3">
        <Aside.Container>
          <Aside icon={History} title="Version">
            Version {venue.version}
          </Aside>
          <Aside icon={StatusUnknown} title="Status">
            {getEnumDisplayValue(venue.status)}
          </Aside>
          {venue.telephone && (
            <Aside icon={Telephone} title="Telephone">
              <ExtendedAnchor
                label={venue.telephone}
                href={`tel:${venue.telephone}`}
              />
            </Aside>
          )}
          {venue.email && (
            <Aside icon={Email} title="Email">
              <ExtendedAnchor
                label={venue.email}
                href={`mailto:${venue.email}`}
              />
            </Aside>
          )}
          {venue.address && (
            <Aside icon={Address} title="Address">
              {venue.address.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
              {venue.postcode}
            </Aside>
          )}
          {venue.hasPermanentCollection && (
            <Aside icon={Info} title="Collection">
              Has a permanent collection
            </Aside>
          )}
          <DisabilityAccess
            links={venue.links}
            wheelchairAccessType={venue.wheelchairAccessType}
            disabledBathroomType={venue.disabledBathroomType}
            hearingFacilitiesType={venue.hearingFacilitiesType}
          />
        </Aside.Container>
        <IconLinkList links={venue.links} entityType={entityType.VENUE} />
      </Column>
    </Column.Container>
  </React.Fragment>
);

export default pure(VenueDetail);
