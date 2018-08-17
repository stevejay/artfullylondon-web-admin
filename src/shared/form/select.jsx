// @flow

import type { FieldRenderProps } from "react-final-form";

import * as React from "react";
import { Select, Box, Text } from "grommet";

type SelectType = {
  target: any,
  option: string | {},
  value: string | {},
  selected: number
};

type Props = {
  ...$Exact<FieldRenderProps>,
  +a11yTitle: string
};

export default class FormSelect extends React.Component<Props> {
  handleChange = (arg: SelectType) => {
    this.props.input.onChange(arg.value);
  };
  renderItem = (value: { label: string }) => (
    <Box align="start" pad="small" data-test={value.label}>
      <Text margin="none">{value.label}</Text>
    </Box>
  );
  render() {
    const { a11yTitle, input, ...rest } = this.props;
    return (
      <Select
        {...rest}
        a11yTitle={a11yTitle}
        id={input.name}
        name={input.name}
        value={input.value}
        onChange={this.handleChange}
        onBlur={input.onBlur}
      >
        {this.renderItem}
      </Select>
    );
  }
}
