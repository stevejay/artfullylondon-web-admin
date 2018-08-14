// @flow

import type { ApolloClient } from "apollo-client";
import type { LoginFormValues } from "../flow-types";

import _ from "lodash";
import empty from "empty";
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
        const session = await amplify.auth.attemptAutoLogin();
        const authData = {
          authenticated: true,
          username: _.get(session, "idToken.payload.cognito:username"),
          groups:
            _.get(session, "idToken.payload.cognito:groups") || empty.array
        };
        if (session) {
          cache.writeData({
            data: {
              auth: {
                __typename: AUTH_CLIENT_STATE_TYPENAME,
                ...authData
              }
            }
          });
        }
        return null;
      },
      logIn: async (
        __: any,
        values: LoginFormValues,
        { cache }: ApolloClient<any>
      ) => {
        const session: { signInUserSession?: any } = await amplify.auth.logIn(
          values
        );
        const authData = {
          authenticated: true,
          username: _.get(
            session.signInUserSession,
            "idToken.payload.cognito:username"
          ),
          groups:
            _.get(
              session.signInUserSession,
              "idToken.payload.cognito:groups"
            ) || empty.array
        };
        if (session) {
          cache.writeData({
            data: {
              auth: {
                __typename: AUTH_CLIENT_STATE_TYPENAME,
                ...authData
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
