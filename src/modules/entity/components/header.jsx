// @flow

import type { ImageArray } from "../flow-types";

import * as React from "react";
import { Box, Button, Text, Heading } from "grommet";
import HeroBox from "shared/hero-box";
import AnimationBox from "shared/animation-box";
import { getEntityTypeIcon } from "shared/utils/entity";
import HeaderImage from "./header-image";

const HEADING_MARGIN = { top: "none", bottom: "xsmall" };
const SUB_TITLE_PAD = { vertical: "xsmall", right: "xsmall" };
const SUB_TITLE_BORDER = { color: "dark-5", side: "top", size: "xsmall" };
const BUTTON_BOX_MARGIN = { horizontal: "none", top: "small" };

type Props = {
  +id: string,
  +name: string,
  +subTitle: string,
  +entityType: string,
  +images?: ?ImageArray,
  +onEdit: void => void
};

const Header = ({ name, subTitle, images, entityType, onEdit }: Props) => (
  <AnimationBox
    animation="fadeIn"
    tag="header"
    direction="row-responsive"
    background="light-3"
  >
    <HeaderImage images={images} entityType={entityType} />
    <HeroBox
      pad="medium"
      responsive
      background="light-3"
      direction="column"
      flex
      align="start"
      pattern="wave"
    >
      <HeroBox.Icon
        icon={getEntityTypeIcon(entityType)}
        size="xxxlarge"
        color="light-4"
        alignment="right"
      />
      <Heading level={1} responsive margin={HEADING_MARGIN}>
        {name}
      </Heading>
      <Box responsive pad={SUB_TITLE_PAD} border={SUB_TITLE_BORDER}>
        <Text size="xlarge">{subTitle}</Text>
      </Box>
      <Box flex responsive justify="end" margin={BUTTON_BOX_MARGIN}>
        <Button primary onClick={onEdit} label="Edit" />
      </Box>
    </HeroBox>
  </AnimationBox>
);

export default Header;
