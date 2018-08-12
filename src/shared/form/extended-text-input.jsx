// @flow

import type { FieldProps } from "formik";

import * as React from "react";
import styled from "styled-components";
import { TextInput } from "grommet";
import withTheme from "shared/with-theme";

const StyledTextInput = styled(TextInput)`
  background-color: ${props =>
    props.theme.global.colors[props.inputBackground]};
`;

type Props = {
  ...FieldProps,
  inputBackground: ?string
};

export const ExtendedTextInput = ({
  field,
  form,
  inputBackground,
  ...rest
}: Props) => (
  <StyledTextInput
    {...rest}
    inputBackground={inputBackground}
    id={field.name}
    name={field.name}
    value={field.value}
    onChange={field.onChange}
    onBlur={field.onBlur}
  />
);

export default withTheme(ExtendedTextInput);
