// @flow

import * as React from "react";
import { Text } from "grommet";
import { NewWindow } from "grommet-icons";
import ExtendedAnchor from "shared/extended-anchor";

type Props = {
  +label: string,
  +url: string
};

const ExternalLink = ({ label, url }: Props) => (
  <Text>
    <ExtendedAnchor
      color="brand"
      label={label}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    />
    &nbsp;
    <NewWindow color="light-6" size="small" role="presentation" aria-hidden />
  </Text>
);

export default ExternalLink;
