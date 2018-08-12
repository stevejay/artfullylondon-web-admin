// @flow

import type { LinkArray } from "../flow-types";

import * as React from "react";
import { Accessibility } from "grommet-icons";
import Aside from "./aside";
import ExternalLink from "./external-link";
import { getAccessText } from "../utils/disability-access";
import { tryGetLinkByType } from "../utils/link";
import * as linkType from "../types/link-type";

type Props = {
  +links: ?LinkArray,
  +wheelchairAccessType: string,
  +disabledBathroomType: string,
  +hearingFacilitiesType: string
};

const DisabilityAccess = ({
  links,
  wheelchairAccessType,
  disabledBathroomType,
  hearingFacilitiesType
}: Props) => {
  const accessLink = tryGetLinkByType(links, linkType.ACCESS);
  return (
    <Aside icon={Accessibility} title="Accessibility">
      {getAccessText(
        wheelchairAccessType,
        disabledBathroomType,
        hearingFacilitiesType,
        !!accessLink
      )}
      {accessLink && " "}
      {accessLink && (
        <ExternalLink label="More information" url={accessLink.url} />
      )}
    </Aside>
  );
};

export default DisabilityAccess;
