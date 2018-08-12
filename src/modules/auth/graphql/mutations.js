// @flow

import gql from "graphql-tag";

export const LogIn = gql`
  mutation LogIn($username: String!, $password: String!) {
    logIn(username: $username, password: $password) @client
  }
`;

export const LogOut = gql`
  mutation LogOut {
    logOut @client
  }
`;

export const AttemptAutoLogin = gql`
  mutation AttemptAutoLogin {
    attemptAutoLogin @client
  }
`;
