// @flow

import * as React from "react";
import { pure } from "recompose";
import { Search as SearchIcon } from "grommet-icons";
import PageHeader from "shared/page-header";
import SearchResultSectionHandler from "./search-result-section-handler";

const SearchResultPage = () => (
  <React.Fragment>
    <PageHeader
      icon={SearchIcon}
      title="Search"
      subTitle="Search for system entities"
    />
    <SearchResultSectionHandler />
  </React.Fragment>
);

export default pure(SearchResultPage);
