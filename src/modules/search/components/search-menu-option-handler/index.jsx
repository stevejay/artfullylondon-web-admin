// @flow

import * as React from "react";
import { Responsive } from "grommet";
import { withStateHandlers } from "recompose";
import SearchModalHandler from "./search-modal-handler";

type Props = {
  +component: React.ElementType
};

type EnhancedProps = {
  ...$Exact<Props>, // TODO this might be a flow bug that Exact is required here
  +searchOpen: boolean,
  +searchOpened: void => void,
  +searchClosed: void => void
};

export const SearchMenuOptionHandler = ({
  component: Component,
  searchOpen,
  searchOpened,
  searchClosed
}: EnhancedProps) => (
  <React.Fragment>
    <Component searchOpen={searchOpen} onClick={searchOpened} />
    <Responsive onChange={searchClosed}>
      <SearchModalHandler open={searchOpen} onClose={searchClosed} />
    </Responsive>
  </React.Fragment>
);

export default withStateHandlers(
  { searchOpen: false },
  {
    searchClosed: () => () => ({ searchOpen: false }),
    searchOpened: () => () => ({ searchOpen: true })
  }
)(SearchMenuOptionHandler);
