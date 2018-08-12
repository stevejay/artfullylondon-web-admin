// @flow

import * as React from "react";
import { shouldUpdate } from "recompose";
import { Box } from "grommet";
import ExtendedRoutedAnchor from "shared/scroll/extended-routed-anchor";

type Props = {
  +label: string,
  +to: string,
  +icon: React.ElementType,
  +onClick?: void => void
};

// TODO could highlight the link if it is for the current page

const SidebarLink = ({ icon: Icon, onClick, to, label, ...rest }: Props) => (
  <Box direction="row" gap="small" margin="xsmall" responsive={false}>
    <Icon color="light-6" role="presentation" aria-hidden />
    <ExtendedRoutedAnchor {...rest} path={to} onClick={onClick}>
      {label}
    </ExtendedRoutedAnchor>
  </Box>
);

export default shouldUpdate(() => false)(SidebarLink);
