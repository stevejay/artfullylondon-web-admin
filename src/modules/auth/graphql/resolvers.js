// @flow

import type { ApolloClient } from "apollo-client";
import type { LoginFormValues } from "../flow-types";

import empty from "empty";
import * as authService from "../auth-service";

const AUTH_CLIENT_STATE_TYPENAME = "Auth";

export default {
  defaults: {
    auth: {
      __typename: AUTH_CLIENT_STATE_TYPENAME,
      authenticated: false,
      username: null,
      groups: empty.array
    }
  },
  resolvers: {
    // Need an empty Query obj here because of a bug preventing
    // default client state resetting on reset store:
    // https://github.com/apollographql/apollo-link-state/issues/198
    Query: () => ({}),
    Mutation: {
      attemptAutoLogin: async (__: *, ___: *, { cache }: ApolloClient<any>) => {
        const authData = await authService.attemptAutoLogin();
        writeAuthClientState(cache, authData);
        return null;
      },
      logIn: async (
        __: *,
        values: LoginFormValues,
        { cache }: ApolloClient<any>
      ) => {
        const authData = await authService.logIn(
          values.username,
          values.password
        );
        writeAuthClientState(cache, authData);
        return null;
      },
      logOut: async () => {
        await authService.logOut();
        return null;
      }
    }
  }
};

function writeAuthClientState(cache, authData) {
  if (authData && authData.authenticated) {
    cache.writeData({
      data: {
        auth: {
          __typename: AUTH_CLIENT_STATE_TYPENAME,
          ...authData
        }
      }
    });
  }
}
