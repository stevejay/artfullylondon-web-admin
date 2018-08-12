// @flow

import * as React from "react";
import { Box, Button, TextInput } from "grommet";
import { FormSearch } from "grommet-icons";

const FormSearchIcon = <FormSearch size="large" color="brand" />;
const INPUT_BORDER = { side: "all", size: "medium", color: "brand" };

type Props = {
  +value: string,
  +onSearchClick: void => void,
  +onChange: (SyntheticEvent<HTMLInputElement>) => void,
  +onKeyDown: (SyntheticKeyboardEvent<HTMLInputElement>) => void,
  +onKeyPress: (SyntheticKeyboardEvent<HTMLInputElement>) => void
};

const SearchInput = ({
  value,
  onSearchClick,
  onChange,
  onKeyDown,
  onKeyPress
}: Props) => (
  <Box
    border={INPUT_BORDER}
    direction="row"
    round="large"
    align="center"
    pad="xsmall"
    background="light-1"
    flex={false}
  >
    <Button
      icon={FormSearchIcon}
      plain
      type="reset"
      onClick={onSearchClick}
      data-test="search"
    />
    <TextInput
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onKeyPress={onKeyPress}
      plain
      placeholder="Search everything..."
      size="large"
      autoFocus
      data-test="search term"
    />
  </Box>
);

export default SearchInput;
