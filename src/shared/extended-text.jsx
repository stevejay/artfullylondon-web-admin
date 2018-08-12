// @flow

import styled from "styled-components";
import { Text } from "grommet";

const ExtendedText = styled(Text)`
  ${props => props.fontStyle && `font-style: ${props.fontStyle}`};
  ${props => props.textTransform && `text-transform: ${props.textTransform}`};
`;

export default ExtendedText;
