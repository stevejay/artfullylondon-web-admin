// @flow

import type { FieldRenderProps } from "react-final-form";

import * as React from "react";
import { pure } from "recompose";
import { TextInput, FormField } from "grommet";

type Props = {
  ...$Exact<FieldRenderProps>,
  label: string
};

const TextField = ({ input, meta, label, ...rest }: Props) => (
  <FormField
    label={label}
    htmlFor={input.name}
    error={
      !!meta.touched &&
      (!!meta.error || !!meta.submitError) &&
      (meta.error || meta.submitError)
    }
  >
    <TextInput
      {...rest}
      id={input.name}
      name={input.name}
      value={input.value}
      onChange={input.onChange}
      onBlur={input.onBlur}
    />
  </FormField>
);

export default pure(TextField);
