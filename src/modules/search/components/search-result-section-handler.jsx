// @flow

import type { QueryRenderProps } from "react-apollo";
import type { SearchState } from "../flow-types";

import * as React from "react";
import { Query } from "react-apollo";
import SearchResultListHandler from "./search-result-list-handler";
import BasicSearchFormHandler from "./basic-search-form-handler";
import { SearchParams } from "../graphql/queries";

const SearchResultSectionHandler = () => (
  <Query query={SearchParams}>
    {({ data }: QueryRenderProps<SearchState>) =>
      !data || !data.searchParams ? null : (
        <React.Fragment>
          <BasicSearchFormHandler {...data.searchParams} />
          <SearchResultListHandler {...data.searchParams} />
        </React.Fragment>
      )
    }
  </Query>
);

export default SearchResultSectionHandler;
