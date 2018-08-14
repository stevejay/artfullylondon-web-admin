// @flow

import type { ApolloClient } from "apollo-client";
import type { LoginFormValues } from "../flow-types";

import * as amplify from "../amplify";

const AUTH_CLIENT_STATE_TYPENAME = "Auth";

export default {
  defaults: {
    auth: {
      __typename: AUTH_CLIENT_STATE_TYPENAME,
      authenticated: false
    }
  },
  resolvers: {
    // Need an empty Query obj here because of a bug preventing
    // default client state resetting on reset store:
    // https://github.com/apollographql/apollo-link-state/issues/198
    Query: () => ({}),
    Mutation: {
      attemptAutoLogin: async (
        __: any,
        values: any,
        { cache }: ApolloClient<any>
      ) => {
        const authData = await amplify.attemptAutoLogin();
        writeAuthClientState(cache, authData);
        return null;
      },
      logIn: async (
        __: any,
        values: LoginFormValues,
        { cache }: ApolloClient<any>
      ) => {
        const authData = await amplify.logIn(values.username, values.password);
        writeAuthClientState(cache, authData);
        return null;
      },
      logOut: async () => {
        await amplify.logOut();
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
