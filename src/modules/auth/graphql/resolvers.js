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
        _: any,
        __: any,
        { cache }: ApolloClient<any>
      ) => {
        const session = await amplify.auth.attemptAutoLogin();
        if (session) {
          cache.writeData({
            data: {
              auth: {
                __typename: AUTH_CLIENT_STATE_TYPENAME,
                authenticated: true
              }
            }
          });
        }
        return null;
      },
      logIn: async (
        _: any,
        values: LoginFormValues,
        { cache }: ApolloClient<any>
      ) => {
        const session = await amplify.auth.logIn(values);
        if (session) {
          cache.writeData({
            data: {
              auth: {
                __typename: AUTH_CLIENT_STATE_TYPENAME,
                authenticated: true
              }
            }
          });
        }
        return null;
      },
      logOut: async () => {
        await amplify.auth.logOut();
        return null;
      }
    }
  }
};
