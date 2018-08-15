// @flow

import type { Session } from "../flow-types";

import Auth from "@aws-amplify/auth";
import * as mapper from "./mapper";

Auth.configure({
  identityPoolId: process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID,
  region: process.env.REACT_APP_COGNITO_REGION,
  userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
  userPoolWebClientId: process.env.REACT_APP_COGNITO_USER_POOL_APP_CLIENT_ID,
  mandatorySignIn: true
});

export async function attemptAutoLogin() {
  const session: ?Session = await Auth.currentSession().catch(() => null);
  return mapper.mapSessionToAuthData(session);
}

export async function logIn(username: string, password: string) {
  const session: ?Session = await Auth.signIn(username, password);
  return mapper.mapSessionToAuthData(session);
}

export async function logOut() {
  await Auth.signOut();
}

export async function getAuthToken() {
  const session: ?Session = await Auth.currentSession().catch(() => null);
  return mapper.mapSessionToAuthToken(session);
}
