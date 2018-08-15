// @flow

import * as React from "react";
import { Box, Paragraph } from "grommet";
import ExtendedText from "shared/extended-text";
import AsideContainer from "./container";

const BOX_MARGIN = { top: "none", bottom: "medium" };
const ICON_STYLE = { opacity: 0.75 };

type Props = {
  +icon: React.ElementType,
  +title: string,
  +children: React.Node
};

const Aside = ({ icon: Icon, title, children }: Props) => (
  <Box
    tag="aside"
    direction="column"
    margin={BOX_MARGIN}
    gap="small"
    align="start"
    responsive
    role="note"
  >
    <Box tag="h4" direction="row" gap="small">
      <Icon
        color="brand"
        size="medium"
        role="presentation"
        aria-hidden
        style={ICON_STYLE}
      />
      <ExtendedText color="dark-6" fontStyle="italic">
        {title}
      </ExtendedText>
    </Box>
    <Paragraph margin="none">{children}</Paragraph>
  </Box>
);

Aside.Container = AsideContainer;
export default Aside;
