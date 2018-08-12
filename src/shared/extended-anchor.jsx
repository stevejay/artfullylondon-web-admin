// @flow

import { Anchor } from "grommet";
import styled from "styled-components";
import withTheme from "shared/with-theme";

// TODO the final release version of Grommet v2 may make
// this anchor styling fix unnecessary:
const ExtendedAnchor = styled(Anchor)`
  word-break: break-all;
  padding: 0;
  ${props =>
    props.plain
      ? "border: none; &:hover { border: none; }"
      : `border-bottom: 1px dotted; &:hover { border-bottom-style: solid; }`};
  ${props => {
    if (!props.color) {
      return;
    }
    const color = props.theme.global.colors[props.color];
    return `color: ${color}; border-color: ${color}; &:hover { border-color: ${color}; }`;
  }};
`;

export default withTheme(ExtendedAnchor);
