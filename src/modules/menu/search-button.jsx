// @flow

import * as React from "react";
import { Button } from "grommet";
import { Search } from "grommet-icons";

const SearchIcon = <Search color="light-1" size="large" />;

type Props = {
  onClick: () => mixed,
  searchOpen: boolean
};

const SearchButton = ({ onClick, searchOpen }: Props) => (
  <Button
    color="light-1"
    icon={SearchIcon}
    onClick={onClick}
    a11yTitle="Open quicksearch dialog"
    aria-haspopup
    aria-expanded={searchOpen}
    data-test="open quicksearch"
  />
);

export default SearchButton;
