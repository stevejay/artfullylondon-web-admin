// @flow

import * as React from "react";
import { Box, Text } from "grommet";
import styled from "styled-components";
import { getDescriptionDisplayHtml } from "../utils/entity";
import SectionHeading from "./section-heading";

const BOX_PAD = { horizontal: "medium", top: "none", bottom: "small" };
const WE_SAY_BOX_MARGIN = { top: "xsmall", bottom: "medium" };

const HtmlBox = styled(Box)`
  & p {
    margin-top: 0;
  }
`;

type Props = {
  +description?: ?string,
  +descriptionCredit?: ?string,
  +weSay?: ?string
};

const Description = ({ description, descriptionCredit, weSay }: Props) => (
  <React.Fragment>
    <SectionHeading title="Description" />
    <Box size="medium" pad={BOX_PAD} responsive>
      <HtmlBox
        responsive
        dangerouslySetInnerHTML={{
          __html: getDescriptionDisplayHtml(description, descriptionCredit)
        }}
      />
      {weSay && (
        <Box
          background="light-2"
          pad="small"
          margin={WE_SAY_BOX_MARGIN}
          responsive
        >
          <Text tag="p" margin="none">
            <em>We say&mdash;</em>
            {weSay}
          </Text>
        </Box>
      )}
    </Box>
  </React.Fragment>
);

export default Description;
