// @flow

import type { ApolloClient } from "apollo-client";
import type { BasicSearchFormValues } from "../flow-types";

import * as entityType from "shared/types/entity-type";

const SEARCH_PARAMS_TYPENAME = "SearchParams";

export default {
  defaults: {
    searchParams: {
      __typename: SEARCH_PARAMS_TYPENAME,
      term: "",
      entityType: entityType.ALL
    }
  },
  resolvers: {
    // Need an empty Query obj here because of a bug preventing
    // default client state resetting on reset store:
    // https://github.com/apollographql/apollo-link-state/issues/198
    Query: () => ({}),
    Mutation: {
      updateSearchParams: (
        _: mixed,
        values: BasicSearchFormValues,
        { cache }: ApolloClient<any>
      ) => {
        cache.writeData({
          data: {
            searchParams: {
              __typename: SEARCH_PARAMS_TYPENAME,
              ...values
            }
          }
        });
        return null;
      }
    }
  }
};
