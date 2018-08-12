// @flow

import * as React from "react";
import { pure } from "recompose";
import { Box, Text, Heading } from "grommet";
import HeroBox from "shared/hero-box";

const HEADING_MARGIN = { top: "none", bottom: "xsmall" };
const SUB_TITLE_BORDER = { color: "dark-5", side: "top", size: "xsmall" };
const SUB_TITLE_PAD = { vertical: "xsmall", right: "xsmall" };

type Props = {
  +icon: React.ElementType,
  +title: string,
  +subTitle: string
};

const PageHeader = ({ icon: Icon, title, subTitle }: Props) => (
  <HeroBox
    pattern="wave"
    tag="header"
    pad="medium"
    responsive
    background="light-3"
  >
    <Box align="center" direction="row-responsive" gap="small" responsive>
      <Icon size="xlarge" color="neutral-2" role="presentation" aria-hidden />
      <Box direction="column">
        <Heading level={1} responsive margin={HEADING_MARGIN}>
          {title}
        </Heading>
        <Box responsive pad={SUB_TITLE_PAD} border={SUB_TITLE_BORDER}>
          <Text size="xlarge">{subTitle}</Text>
        </Box>
      </Box>
    </Box>
  </HeroBox>
);

export default pure(PageHeader);
