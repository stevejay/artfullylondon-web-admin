// @flow

import type { FieldRenderProps } from "react-final-form";

import * as React from "react";
import styled from "styled-components";
import { TextInput } from "grommet";
import withTheme from "shared/with-theme";

const StyledTextInput = styled(TextInput)`
  background-color: ${props =>
    props.theme.global.colors[props.inputBackground]};
`;

type Props = {
  ...$Exact<FieldRenderProps>,
  inputBackground: ?string
};

const ExtendedTextInput = ({ input, inputBackground, ...rest }: Props) => (
  <StyledTextInput
    {...rest}
    inputBackground={inputBackground}
    id={input.name}
    name={input.name}
    value={input.value}
    onChange={input.onChange}
    onBlur={input.onBlur}
  />
);

export default withTheme(ExtendedTextInput);
