// @flow

import type { FieldProps } from "formik";

import * as React from "react";
import { Select, Box, Text } from "grommet";

type SelectType = {
  target: any,
  option: string | {},
  value: string | {},
  selected: number
};

type Props = FieldProps & {
  a11yTitle: string,
  setFieldValue: ({
    field: string,
    value: any,
    shouldValidate: ?boolean
  }) => void
};

export default class FormSelect extends React.Component<Props> {
  handleChange = (arg: SelectType) => {
    this.props.setFieldValue(this.props.field.name, arg.value);
  };
  render() {
    const { a11yTitle, field, form, ...rest } = this.props;
    return (
      <Select
        {...rest}
        a11yTitle={a11yTitle}
        id={field.name}
        name={field.name}
        value={field.value}
        onChange={this.handleChange}
        onBlur={field.onBlur}
      >
        {value => (
          <Box align="start" pad="small" data-test={value.label}>
            <Text margin="none">{value.label}</Text>
          </Box>
        )}
      </Select>
    );
  }
}
