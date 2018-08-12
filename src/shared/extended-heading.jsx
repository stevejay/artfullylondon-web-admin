// @flow

import styled from "styled-components";
import { Heading } from "grommet";

const ExtendedHeading = styled(Heading)`
  ${props => props.fontStyle && `font-style: ${props.fontStyle}`};
  ${props => props.textTransform && `text-transform: ${props.textTransform}`};
`;

export default ExtendedHeading;
