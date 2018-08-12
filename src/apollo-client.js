// @flow

import _ from "lodash";
import { ApolloClient } from "apollo-client";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink, Observable } from "apollo-link";
import { withClientState } from "apollo-link-state";
import log from "loglevel";
import introspectionQueryResultData from "./fragment-types.json";
import { getAuthToken, resolvers as authResolvers } from "./modules/auth";
import { resolvers as searchResolvers } from "./modules/search";

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

const cache = new InMemoryCache({ fragmentMatcher });

const request = async operation => {
  const token = await getAuthToken();
  operation.setContext({
    headers: {
      authorization: token
    }
  });
};

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle;
      Promise.resolve(operation)
        .then(request)
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) {
          handle.unsubscribe();
        }
      };
    })
);

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (
    (networkError && networkError.statusCode === 401) ||
    (graphQLErrors &&
      _.some(
        graphQLErrors,
        error => _.get(error, "extensions.exception.statusCode") === 401
      ))
  ) {
    client.resetStore();
  } else {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        log.error(
          `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
            locations
          )}, Path: ${path}`
        )
      );
    }
    if (networkError) {
      log.error(`[Network error]: ${networkError.message || networkError}`);
    }
  }
});

const clientStateLink = withClientState({
  ..._.merge(authResolvers, searchResolvers),
  cache
});

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_SERVER_URI || ""
});

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, requestLink, clientStateLink, httpLink]),
  cache
});

client.onResetStore(clientStateLink.writeDefaults);

export default client;
