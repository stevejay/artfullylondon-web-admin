// @flow

import * as React from "react";
import styled from "styled-components";
import { Box } from "grommet";
import AnimationBox from "shared/animation-box";

type Props = {
  +children: React.Node
};

const ResponsiveCardBox = styled(Box)`
  @media only screen and (max-width: 699px) {
    flex-basis: auto;
  }

  @media only screen and (min-width: 700px) {
    flex-basis: 33.33%;
  }

  @media only screen and (min-width: 992px) {
    flex-basis: 25%;
  }
`;

const CardBodyBox = styled(AnimationBox)`
  position: relative;

  @media only screen and (max-width: 699px) {
    width: 300px;
    height: 270px; /* TODO find a better approach here */
    min-height: 270px;
  }

  @media only screen and (min-width: 700px) {
    width: 100%;
    height: 27vw;
  }

  @media only screen and (min-width: 992px) {
    width: 100%;
    height: 20vw;
  }

  @media only screen and (min-width: 1200px) {
    max-width: 290px;
    max-height: 256px;
  }
`;

const SearchResultCard = (props: Props) => (
  <ResponsiveCardBox pad="small" flex={false} align="center">
    <CardBodyBox
      animation="fadeIn"
      tag="article"
      pad="none"
      elevation="medium"
      flex="grow"
      background="light-1"
      direction="column"
    >
      {props.children}
    </CardBodyBox>
  </ResponsiveCardBox>
);

export default SearchResultCard;
