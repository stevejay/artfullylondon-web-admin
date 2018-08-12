// @flow

import type { FieldProps } from "formik";

import * as React from "react";
import { TextInput, FormField } from "grommet";

type Props = FieldProps & { label: string };

const TextField = ({ field, form, label, fastFieldFix, ...rest }: Props) => (
  <FormField
    label={label}
    htmlFor={field.name}
    error={
      !!form.touched[field.name] &&
      !!form.errors[field.name] &&
      form.errors[field.name]
    }
  >
    <TextInput
      {...rest}
      id={field.name}
      name={field.name}
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
    />
  </FormField>
);

export default TextField;
