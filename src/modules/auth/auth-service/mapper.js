// @flow

import type { Auth, Session } from "../flow-types";

import _ from "lodash";
import empty from "empty";

export function mapSessionToAuthData(session: ?Session): ?Auth {
  if (!session) {
    return null;
  }
  const idToken = session.signInUserSession
    ? session.signInUserSession.idToken
    : session.idToken;
  return {
    authenticated: !!idToken,
    username: _.get(idToken, "payload.cognito:username") || null,
    groups: _.get(idToken, "payload.cognito:groups") || empty.array
  };
}

export function mapSessionToAuthToken(session: ?Session): ?string {
  return !session || !session.idToken || !session.idToken.jwtToken
    ? null
    : "Bearer " + session.idToken.jwtToken;
}
